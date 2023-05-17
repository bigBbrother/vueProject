import {ref, watch} from "vue";
import {useMouseInElement} from "@vueuse/core/index";

export default function useImageView(target) {
//小图切大图显示
    const activeIndex = ref(0)
    const enterHandler = (index) => {
        activeIndex.value = index
    }
//获取鼠标相对位置
    const {elementX, elementY, isOutside} = useMouseInElement(target)
//控制滑块移动
    const left = ref(0)
    const top = ref(0)
    const positionX = ref(0)
    const positionY = ref(0)
    watch([elementX, elementY], () => {
        //如果鼠标没有进入盒子不执行函数
        if (isOutside.value) return
        //横向
        if (elementX.value > 100 && elementX.value < 300) {
            left.value = elementX.value - 100
        }
        //纵向
        if (elementY.value > 100 && elementY.value < 300) {
            top.value = elementY.value - 100
        }
        //处理边界
        if (elementX.value > 300) {
            left.value = 200
        }
        if (elementX.value < 100) {
            left.value = 0
        }
        if (elementY.value > 300) {
            top.value = 200
        }
        if (elementY.value < 100) {
            top.value = 0
        }
        positionX.value = -left.value * 2
        positionY.value = -top.value * 2
    })
    //触发事件

    return {
        activeIndex,
        left,
        top,
        positionX,
        positionY,
        isOutside,
        enterHandler
    }
}
