"""
Clean the raw Top-Spotify-by-year dataset into a small dataset for the exercises.

Input : src/lib/assets/data/original/top10s.csv   (Windows-1252 encoded)
Output: src/lib/assets/data/spotify-2010s.csv      (UTF-8)

Transformations:
  1. Keep only 2010-2012.
  2. Collapse the 50 raw "top genre" values into 6 buckets (replaces the column).
  3. Rename columns to short, descriptive names.
  4. Fix the Windows-1252 encoding and normalise smart quotes/dashes -> ASCII.
  5. Drop the columns: dB, live (liveness), val (valence)  [+ the unnamed index].
"""

import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src/lib/assets/data/original/top10s.csv"
OUT = ROOT / "src/lib/assets/data/spotify-2010s.csv"

KEEP_YEARS = {2010, 2011, 2012}

# --- 2. genre -> 6 buckets --------------------------------------------------
GENRE_BUCKET = {
    # Dance pop (its own bucket - it's >half the data)
    "dance pop": "Dance pop",
    # Pop family (generic + nationality pops + arty pops + boy band + electropop)
    "pop": "Pop", "canadian pop": "Pop", "barbadian pop": "Pop", "art pop": "Pop",
    "australian pop": "Pop", "colombian pop": "Pop", "baroque pop": "Pop",
    "candy pop": "Pop", "metropopolis": "Pop", "hollywood": "Pop",
    "danish pop": "Pop", "moroccan pop": "Pop", "boy band": "Pop", "electropop": "Pop",
    # EDM / electronic
    "big room": "EDM", "complextro": "EDM", "australian dance": "EDM", "edm": "EDM",
    "tropical house": "EDM", "electro": "EDM", "belgian edm": "EDM",
    "electronic trap": "EDM", "downtempo": "EDM", "brostep": "EDM",
    "escape room": "EDM", "house": "EDM", "electro house": "EDM",
    # Hip-hop / R&B / soul
    "hip pop": "Hip-hop/R&B", "atl hip hop": "Hip-hop/R&B", "hip hop": "Hip-hop/R&B",
    "detroit hip hop": "Hip-hop/R&B", "canadian hip hop": "Hip-hop/R&B",
    "chicago rap": "Hip-hop/R&B", "australian hip hop": "Hip-hop/R&B",
    "british soul": "Hip-hop/R&B", "canadian contemporary r&b": "Hip-hop/R&B",
    "alternative r&b": "Hip-hop/R&B",
    # Acoustic / folk / singer-songwriter
    "neo mellow": "Acoustic/Folk", "acoustic pop": "Acoustic/Folk",
    "folk-pop": "Acoustic/Folk", "irish singer-songwriter": "Acoustic/Folk",
    # Everything else (rock/indie, latin, country, ...)
    "permanent wave": "Other", "indie pop": "Other", "celtic rock": "Other",
    "alaska indie": "Other", "french indie pop": "Other", "latin": "Other",
    "canadian latin": "Other", "contemporary country": "Other",
}


def bucket_for(raw_genre: str) -> str:
    g = raw_genre.strip().lower()
    if g in GENRE_BUCKET:
        return GENRE_BUCKET[g]
    # substring fallback so an unseen genre still lands somewhere sensible
    if g == "dance pop":
        return "Dance pop"
    if any(k in g for k in ("hip hop", "rap", "r&b", "soul")):
        return "Hip-hop/R&B"
    if any(k in g for k in ("edm", "house", "electro", "room", "step", "tempo", "big room")):
        return "EDM"
    if any(k in g for k in ("folk", "acoustic", "mellow", "singer-songwriter")):
        return "Acoustic/Folk"
    if "pop" in g or "band" in g:
        return "Pop"
    return "Other"


# --- 4. text cleanup (smart quotes / dashes -> ASCII) -----------------------
NORMALISE = {
    "‘": "'", "’": "'",        # curly single quotes
    "“": '"', "”": '"',        # curly double quotes
    "–": "-", "—": "-",        # en / em dash
    "…": "...",                      # ellipsis
    "\xa0": " ",                          # non-breaking space
}


def clean_text(s: str) -> str:
    for bad, good in NORMALISE.items():
        s = s.replace(bad, good)
    return s.strip()


# --- 3. column selection + rename -------------------------------------------
# raw header: "", title, artist, top genre, year, bpm, nrgy, dnce, dB, live,
#             val, dur, acous, spch, pop
# (source index -> output name); dB(8), live(9), val(10) and the index(0) are dropped.
COLUMNS = [
    (1, "title"),
    (2, "artist"),
    (3, "genre"),          # replaced with the bucket
    (4, "year"),
    (5, "bpm"),
    (6, "energy"),
    (7, "danceability"),
    (11, "duration_sec"),
    (12, "acousticness"),
    (13, "speechiness"),
    (14, "popularity"),
]


def main() -> None:
    rows_out = []
    with SRC.open(newline="", encoding="cp1252") as f:
        reader = csv.reader(f)
        next(reader)  # skip raw header
        for row in reader:
            if int(row[4]) not in KEEP_YEARS:
                continue
            record = {}
            for src_i, name in COLUMNS:
                value = clean_text(row[src_i])
                if name == "genre":
                    value = bucket_for(row[3])
                record[name] = value
            rows_out.append(record)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    field_names = [name for _, name in COLUMNS]
    with OUT.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=field_names)
        writer.writeheader()
        writer.writerows(rows_out)

    print(f"Wrote {len(rows_out)} rows -> {OUT.relative_to(ROOT)}")
    # quick sanity summary
    from collections import Counter
    by_year = Counter(r["year"] for r in rows_out)
    by_genre = Counter(r["genre"] for r in rows_out)
    print("By year:  ", dict(sorted(by_year.items())))
    print("By genre: ", dict(by_genre.most_common()))


if __name__ == "__main__":
    main()