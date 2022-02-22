<div>
    <m-auto-horizontal-scroll
        min-width="3856px"
        :left-gradient-active="true"
        :right-gradient-active="true"
        :previous-button-active="false"
        :next-button-active="false"
        :display-horizontal-scrollbar="true"
        style="width: 100%;">
        <div style="display: flex; padding: 0 16px 16px 0;">
            <article
                v-for="item in 18"
                :key="item"
                style="background-color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 16px; width: 200px; height: 200px; box-shadow: 0 2px 4px rgba(0, 0 , 0, 0.1);"
                :style="{
                    marginRight: item < 18 ? '16px' : undefined,
                }"
            >
                <p class="mu-no-m">Boîte <b>{{ item }}</b></p>
            </article>
        </div>
    </m-auto-horizontal-scroll>
</div>
