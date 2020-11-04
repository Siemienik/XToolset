<template>
    <div class="fixed bg-tiffany-blue br2 near-white pa2 top-right">
        <div class="f4 fw6">xlsx-import</div>
        <div class="mt3">
            <a
                class="link dim white"
                href="https://github.com/Siemienik/xlsx-import"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Github class="dib h2 w2" />
            </a>
        </div>
    </div>
</template>

<script>
import Github from './Github';

export default {
    name: 'XlsxImportLogo',
    components: {
        Github,
    },
};
</script>

<style scoped>
.bg-tiffany-blue {
    background-color: #07beb8;
}

.top-right {
    top: 12px;
    right: 12px;
}
</style>
