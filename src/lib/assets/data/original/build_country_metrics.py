"""
Build country-metrics.csv by joining the per-country, per-year datasets listed
in SOURCES on the most recent year where all of them have data, with one
column per metric.

Run from this folder (src/lib/assets/data/original):
    python build_country_metrics.py
"""

from pathlib import Path
import pandas as pd

HERE = Path(__file__).parent
OUT = HERE.parent / "country-metrics.csv"

REQUIRED_COLS = ["life_expectancy", "population", "co2_emissions", "undernourishment_pct"]
TOP_N_BY_POPULATION = 72

SOURCES = {
    "extreme_poverty_pct": {
        "file": "share-of-population-in-extreme-poverty.csv",
        "value_col": "Share of population in poverty ($3 a day)",
    },
    "undernourishment_pct": {
        "file": "prevalence-of-undernourishment.csv",
        "value_col": "2.1.1 prevalence of undernourishment - Value (percent)",
    },
    "population": {
        "file": "population.csv",
        "value_col": "all years",
    },
    "gdp_per_capita": {
        "file": "gdp-per-capita-maddison-project-database.csv",
        "value_col": "GDP per capita",
    },
    "co2_emissions": {
        "file": "annual-co2-emissions-per-country.csv",
        "value_col": "Annual CO₂ emissions",
    },
    "life_expectancy": {
        "file": "life-expectancy.csv",
        "value_col": "Life expectancy",
    },
}


def is_country_code(code):
    return isinstance(code, str) and len(code) == 3 and code.isalpha() and not code.startswith("OWID")


def load(src):
    df = pd.read_csv(HERE / src["file"])
    df = df[["Entity", "Code", "Year", src["value_col"]]].dropna(subset=[src["value_col"]])
    df = df[df["Code"].apply(is_country_code)]
    return df


def latest_common_year(frames):
    year_sets = [set(df["Year"].unique()) for df in frames.values()]
    common = set.intersection(*year_sets)
    if not common:
        raise RuntimeError("No year is present in all datasets.")
    return max(common)


def main():
    frames = {name: load(src) for name, src in SOURCES.items()}
    year = latest_common_year(frames)
    print(f"Latest year present in all {len(frames)} datasets: {year}")

    merged = None
    for name, df in frames.items():
        slice_ = df[df["Year"] == year][["Entity", "Code", SOURCES[name]["value_col"]]]
        slice_ = slice_.rename(columns={SOURCES[name]["value_col"]: name})
        merged = slice_ if merged is None else merged.merge(slice_, on=["Entity", "Code"], how="outer")

    merged.insert(2, "Year", year)

    before = len(merged)
    merged = merged.dropna(subset=REQUIRED_COLS)
    print(f"Dropped {before - len(merged)} rows with nulls in {REQUIRED_COLS} ({len(merged)} remain)")

    merged = merged.nlargest(TOP_N_BY_POPULATION, "population")
    print(f"Kept top {TOP_N_BY_POPULATION} by population ({len(merged)} rows)")

    merged = merged.sort_values("Entity").reset_index(drop=True)
    merged.to_csv(OUT, index=False)
    print(f"Wrote {len(merged)} rows to {OUT}")


if __name__ == "__main__":
    main()
