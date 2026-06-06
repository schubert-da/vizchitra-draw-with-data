<script>
	import LessonLayout from '$components/Exercises/LessonLayout.svelte';
	import Lesson, { metadata } from '$lib/content/exercises/svg-coordinates.md';
</script>

<svelte:head><title>{metadata.title} • Exercises</title></svelte:head>

<LessonLayout lesson={Lesson}>
	<!-- Workspace placeholder; the editable code + live output lands here later. -->
	<p class="workspace-placeholder">Output coming soon</p>
</LessonLayout>

<style>
	.workspace-placeholder {
		font-size: 0.95rem;
	}
</style>
