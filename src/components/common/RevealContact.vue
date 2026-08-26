<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { NButton, useMessage } from 'naive-ui';
import { maskContact } from '@/utils/contact';

const props = defineProps<{
  type: 'email' | 'phone';
  value: string;
}>();

const { t } = useI18n();
const message = useMessage();
const revealed = ref(false);

const displayValue = computed(() => (
  revealed.value ? props.value : maskContact(props.value, props.type)
));

const href = computed(() => (
  props.type === 'email' ? `mailto:${props.value}` : `tel:${props.value}`
));

async function copyValue() {
  try {
    await navigator.clipboard.writeText(props.value);
    message.success(t('contact.copied'));
  } catch {
    message.error(t('contact.copyFailed'));
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <a
      v-if="revealed"
      :href="href"
      class="break-all font-medium text-foreground hover:text-primary"
    >
      {{ displayValue }}
    </a>
    <p v-else class="font-medium tracking-wide text-foreground">
      {{ displayValue }}
    </p>
    <div class="flex flex-wrap gap-2">
      <NButton size="small" secondary round @click="revealed = !revealed">
        {{ revealed ? t('contact.hide') : t('contact.reveal') }}
      </NButton>
      <NButton v-if="revealed" size="small" tertiary round @click="copyValue">
        {{ t('contact.copy') }}
      </NButton>
    </div>
  </div>
</template>
