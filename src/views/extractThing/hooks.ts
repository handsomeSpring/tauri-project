import SecondChoose from '@/views/extractThing/secondChoose.vue';
import lastChooseCard from '@/views/extractThing/lastChooseCard.vue';
import lastChooseBallot from '@/views/extractThing/lastChooseBallot.vue';
import threeChoose from '@/views/extractThing/threeChoose.vue';
import type { Component } from 'vue';

// 创造一个新的抽签
export const getNextComponent = (data: any, key: string): Component => {
  // 如果是赛制
  if (key === 'gameMode') {
    return SecondChoose
  }
  if (key === 'extractMode') {
    return threeChoose
  }
  if (key === 'last') {
    if (data === 'Card') {
      return lastChooseCard;
    } else {
      return lastChooseBallot;
    }
  }
  return SecondChoose
}