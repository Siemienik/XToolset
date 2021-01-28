<script lang="ts">
    let headerClassName: string = 'fw6 bb b--light-gray tl pb3 pr3';
    let bodyClassName: string = 'pv3 pr3 bb b--light-gray';
</script>

<div class="pa0 pv4 pa4-ns">
    <div class="overflow-auto">
        <table class="f6 w-100 mw8 center" cellspacing="0">
            <slot name="thead" {headerClassName} />
            <slot name="tbody" class="lh-copy" {bodyClassName} />
            <slot>
                <div>No content was provided</div>
            </slot>
        </table>
    </div>
</div>
