<template>
  <ul v-if="isViral" class="list">
    <div class="sub-menu-header" @click.stop="drawer.resetDrawerView">
      < Notifications
    </div>
    <TransitionGroup name="comment">
      <li v-for="(item, index) in visibleComments" :key="item">
        {{ item }}
      </li>
    </TransitionGroup>
  </ul>
  <ul v-else class="list">
    <div class="sub-menu-header" @click.stop="drawer.resetDrawerView">
      < Phone
    </div>
    <div style="padding: 1vw" v-if="items.length === 0">
      You're looking at your phone. Some stuff is happening. This is an example.
    </div>
    <li
      v-else
      v-for="(item, index) in items"
      :key="index"
      :class="{ highlight: !item.isRead }"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useGameStore } from "@/stores/game";
import { dogKickerComments, phoneItems } from "@/data/phone";
import { useDrawerStore } from "@/stores/drawer";

const game = useGameStore();
const drawer = useDrawerStore();

const scenes = computed(() =>
  game.scenes.filter((sc) => !sc.includes("intro"))
);

const numberOfPhoneItems = computed(() => {
  const distinctScenes = Array.from(new Set(scenes.value));
  return Math.floor(distinctScenes.length / 4);
});

const items = computed(() => {
  return phoneItems.length <= numberOfPhoneItems.value
    ? phoneItems
    : phoneItems.slice(0, numberOfPhoneItems.value);
});

const isViral = computed(() => {
  return drawer.phoneIsCrazy;
});

const comments = computed(() => {
  const arr = [...dogKickerComments];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
});

const visibleComments = ref<string[]>(comments.value.slice(0, 9));

onMounted(() => {
  if (isViral) {
    let i = 0;
    const remainingComments = comments.value.slice(9);
    const interval = setInterval(() => {
      if (i < remainingComments.length) {
        visibleComments.value.unshift(remainingComments[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 3000);
  }
});
</script>

<style scoped>
.list {
  list-style: none;
  padding: 0px 0px 4vw 0px;
  margin: 0;
}

.list li {
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0.75rem;
  font-weight: 600;
  padding: 1vw 2vw;
  cursor: default;
}

li::before {
  content: "•";
  position: relative;
  left: -1vw;
  margin-right: -0.5em;
  justify-items: center;
  color: black;
  font-size: 1em;
}

li.highlight {
  background-color: rgba(181, 109, 60, 0.33);
  color: black;
}

.comment-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.comment-enter-active {
  transition: all 0.4s ease;
}
.comment-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.comment-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.comment-leave-active {
  transition: all 0.4s ease;
}
.comment-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
