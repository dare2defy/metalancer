<template>
    <div class="page">
        <div class="content">
            <h1>Metaverse Pool</h1>

            <div class="tabset">
                <!-- Tab 1 -->
                <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked />
                <label for="tab1">Märzen</label>
                <!-- Tab 2 -->
                <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier" />
                <label for="tab2">Rauchbier</label>
                <!-- Tab 3 -->
                <input type="radio" name="tabset" id="tab3" aria-controls="dunkles" />
                <label for="tab3">Dunkles Bock</label>

                <div class="tab-panels">
                    <section id="marzen" class="tab-panel">
                        <h2>6A. Märzen</h2>
                        <p>
                            <strong>Overall Impression:</strong> An elegant, malty German amber
                            lager with a clean, rich, toasty and bready malt flavor, restrained
                            bitterness, and a dry finish that encourages another drink. The overall
                            malt impression is soft, elegant, and complex, with a rich aftertaste
                            that is never cloying or heavy.
                        </p>
                        <p>
                            <strong>History:</strong> As the name suggests, brewed as a stronger
                            “March beer” in March and lagered in cold caves over the summer. Modern
                            versions trace back to the lager developed by Spaten in 1841,
                            contemporaneous to the development of Vienna lager. However, the Märzen
                            name is much older than 1841; the early ones were dark brown, and in
                            Austria the name implied a strength band (14 °P) rather than a style.
                            The German amber lager version (in the Viennese style of the time) was
                            first served at Oktoberfest in 1872, a tradition that lasted until 1990
                            when the golden Festbier was adopted as the standard festival beer.
                        </p>
                    </section>
                    <section id="rauchbier" class="tab-panel">
                        <h2>6B. Rauchbier</h2>
                        <p>
                            <strong>Overall Impression:</strong> An elegant, malty German amber
                            lager with a balanced, complementary beechwood smoke character.
                            Toasty-rich malt in aroma and flavor, restrained bitterness, low to high
                            smoke flavor, clean fermentation profile, and an attenuated finish are
                            characteristic.
                        </p>
                        <p>
                            <strong>History:</strong> A historical specialty of the city of Bamberg,
                            in the Franconian region of Bavaria in Germany. Beechwood-smoked malt is
                            used to make a Märzen-style amber lager. The smoke character of the malt
                            varies by maltster; some breweries produce their own smoked malt
                            (rauchmalz).
                        </p>
                    </section>
                    <section id="dunkles" class="tab-panel">
                        <h2>6C. Dunkles Bock</h2>
                        <p>
                            <strong>Overall Impression:</strong> A dark, strong, malty German lager
                            beer that emphasizes the malty-rich and somewhat toasty qualities of
                            continental malts without being sweet in the finish.
                        </p>
                        <p>
                            <strong>History:</strong> Originated in the Northern German city of
                            Einbeck, which was a brewing center and popular exporter in the days of
                            the Hanseatic League (14th to 17th century). Recreated in Munich
                            starting in the 17th century. The name “bock” is based on a corruption
                            of the name “Einbeck” in the Bavarian dialect, and was thus only used
                            after the beer came to Munich. “Bock” also means “Ram” in German, and is
                            often used in logos and advertisements.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
/*
 CSS for the main interaction
*/
.tabset > input[type="radio"] {
    position: absolute;
    left: -200vw;
}

.tabset .tab-panel {
    display: none;
}

.tabset > input:first-child:checked ~ .tab-panels > .tab-panel:first-child,
.tabset > input:nth-child(3):checked ~ .tab-panels > .tab-panel:nth-child(2),
.tabset > input:nth-child(5):checked ~ .tab-panels > .tab-panel:nth-child(3),
.tabset > input:nth-child(7):checked ~ .tab-panels > .tab-panel:nth-child(4),
.tabset > input:nth-child(9):checked ~ .tab-panels > .tab-panel:nth-child(5),
.tabset > input:nth-child(11):checked ~ .tab-panels > .tab-panel:nth-child(6) {
    display: block;
}

.tabset > label {
    position: relative;
    display: inline-block;
    padding: 15px 15px 25px;
    border: 1px solid transparent;
    border-bottom: 0;
    cursor: pointer;
    font-weight: 600;
}

.tabset > label::after {
    content: "";
    position: absolute;
    left: 15px;
    bottom: 10px;
    width: 22px;
    height: 4px;
    background: #8d8d8d;
}

.tabset > label:hover,
.tabset > input:focus + label {
    color: #06c;
}

.tabset > label:hover::after,
.tabset > input:focus + label::after,
.tabset > input:checked + label::after {
    background: #06c;
}

.tabset > input:checked + label {
    border-color: #ccc;
    border-bottom: 1px solid #fff;
    margin-bottom: -1px;
}

.tab-panel {
    padding: 30px 0;
    border-top: 1px solid #ccc;
}

/*
 Demo purposes only
*/
*,
*:before,
*:after {
    box-sizing: border-box;
}

body {
    padding: 30px;
}

.tabset {
    max-width: 65em;
}
.page {
    flex: 1;
}

.content {
    position: relative;
    max-width: 980px;
    margin: 0 auto;
    padding: 16px;
}
</style>
