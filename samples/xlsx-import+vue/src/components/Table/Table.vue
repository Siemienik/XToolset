<template>
    <div class="pa0 pv4 pa4-ns">
        <div class="overflow-auto">
            <table class="f6 w-100 mw8 center" cellspacing="0">
                <thead>
                    <tr>
                        <th class="fw6 bb b--light-gray tl pb3 pr3" v-for="item in headers" :key="item">
                            {{ item }}
                        </th>
                    </tr>
                </thead>
                <tbody class="lh-copy">
                    <tr
                        :key="idx"
                        v-for="(row, idx) in rows"
                        :data-qa-name="dataQaName ? dataQaName + '-' + idx : undefined"
                    >
                        <slot name="items" :className="'pv3 pr3 bb b--light-gray'" :row="row" />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Table',
    props: {
        headers: {
            type: Array,
            required: true,
        },
        rows: {
            type: Array,
            required: true,
        },
        dataQaName: {
            type: String,
            default: '',
        },
    },
};
</script>
