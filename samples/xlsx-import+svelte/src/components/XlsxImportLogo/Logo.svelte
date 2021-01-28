<script>
    import Github from './Github.svelte';
</script>

<div class="fixed bg-tiffany-blue br2 near-white pa2 position">
    <div class="f4 fw6">xlsx-import</div>
    <div class="mt3">
        <a
            class="link dim white"
            href="https://github.com/Siemienik/xlsx-import"
            target="_blank"
            rel="noopener noreferrer"
        >
            <Github className="dib h2 w2" />
        </a>
    </div>
</div>

<style>
    .bg-tiffany-blue {
        background-color: #07beb8;
    }

    .position {
        right: 12px;
        top: 12px;
    }
</style>
