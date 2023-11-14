<script lang="ts">
import { type StatisticInfo } from 'Statistic'
export let statistics: StatisticInfo = {
    basic: 0,
    intermediate: 0,
    advanced: 0,
    specialized: 0,
    idiomatic: 0,
}

$: total = Object.values(statistics).reduce((sum, current) => sum + current, 0)
$: basic = ((statistics.basic * 100) / total).toFixed(2) + '%'
$: intermediate = ((statistics.intermediate * 100) / total).toFixed(2) + '%'
$: advanced = ((statistics.advanced * 100) / total).toFixed(2) + '%'
$: specialized = ((statistics.specialized * 100) / total).toFixed(2) + '%'
$: idiomatic = ((statistics.idiomatic * 100) / total).toFixed(2) + '%'

export function update(stat: StatisticInfo) {
    statistics = stat
}
</script>

<figure>
    <div class="chart">
        <span class="segment sg-basic" style="width: {basic}"></span>
        <span class="segment sg-intermediate" style="width: {intermediate}"
        ></span>
        <span class="segment sg-advanced" style="width: {advanced}"></span>
        <span class="segment sg-specialized" style="width: {specialized}"
        ></span>
        <span class="segment sg-idiomatic" style="width: {idiomatic}"></span>
    </div>
</figure>

<style lang="scss">
.chart {
    width: 100%;
    height: 25px;
    padding: 0;
    margin: 0;
	display: flex;

    .segment {
        display: block;
        height: 25px;
        padding: 0;
        margin: 0;
    }

    .segment.sg-basic {
        background-color: rgba(
            var(--vocab-hl-basic),
            var(--vocab-hl-basic-opacity)
        );
    }

    .segment.sg-intermediate {
        background-color: rgba(
            var(--vocab-hl-intermediate),
            var(--vocab-hl-intermediate-opacity)
        );
    }

    .segment.sg-advanced {
        background-color: rgba(
            var(--vocab-hl-advanced),
            var(--vocab-hl-advanced-opacity)
        );
    }

    .segment.sg-specialized {
        background-color: rgba(
            var(--vocab-hl-specialized),
            var(--vocab-hl-specialized-opacity)
        );
    }

    .segment.sg-idiomatic {
        background-color: rgba(
            var(--vocab-hl-idiomatic),
            var(--vocab-hl-idiomatic-opacity)
        );
    }
}
</style>
