<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NButton,
  useMessage,
} from 'naive-ui';
import type { FormInst, FormRules, SelectOption } from 'naive-ui';
import { contactIntents } from '@/data/contact';
import { SITE_EMAIL } from '@/data/site';

interface ContactFormModel {
  name: string;
  email: string;
  intent: string;
  message: string;
}

const { t } = useI18n();
const message = useMessage();
const formRef = ref<FormInst | null>(null);
const submitting = ref(false);
const model = ref<ContactFormModel>({
  name: '',
  email: '',
  intent: 'collab',
  message: '',
});

const intentOptions = computed<SelectOption[]>(() => contactIntents.map((intent) => ({
  label: t(intent.labelKey),
  value: intent.id,
})));

const rules = computed<FormRules>(() => ({
  name: { required: true, message: t('contact.form.nameRequired'), trigger: ['blur', 'input'] },
  email: [
    { required: true, message: t('contact.form.emailRequired'), trigger: ['blur', 'input'] },
    { type: 'email', message: t('contact.form.emailInvalid'), trigger: ['blur', 'input'] },
  ],
  intent: { required: true, message: t('contact.form.intentRequired'), trigger: ['blur', 'change'] },
  message: { required: true, message: t('contact.form.messageRequired'), trigger: ['blur', 'input'] },
}));

async function handleSubmit() {
  try {
    await formRef.value?.validate();
  } catch {
    return;
  }

  submitting.value = true;
  const intentLabel = t(`contact.intent.${model.value.intent}`);
  const subject = `[Kinolin] ${intentLabel} - ${model.value.name}`;
  const body = [
    `${t('contact.form.name')}: ${model.value.name}`,
    `${t('contact.form.email')}: ${model.value.email}`,
    `${t('contact.form.intent')}: ${intentLabel}`,
    '',
    model.value.message,
  ].join('\n');

  window.location.href = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  message.success(t('contact.form.success'));
  submitting.value = false;
}
</script>

<template>
  <NForm
    ref="formRef"
    :model="model"
    :rules="rules"
    label-placement="top"
    require-mark-placement="right-hanging"
  >
    <NFormItem :label="t('contact.form.name')" path="name">
      <NInput v-model:value="model.name" :placeholder="t('contact.form.namePlaceholder')" />
    </NFormItem>
    <NFormItem :label="t('contact.form.email')" path="email">
      <NInput v-model:value="model.email" :placeholder="t('contact.form.emailPlaceholder')" />
    </NFormItem>
    <NFormItem :label="t('contact.form.intent')" path="intent">
      <NSelect v-model:value="model.intent" :options="intentOptions" />
    </NFormItem>
    <NFormItem :label="t('contact.form.message')" path="message">
      <NInput
        v-model:value="model.message"
        type="textarea"
        :rows="5"
        :placeholder="t('contact.form.messagePlaceholder')"
      />
    </NFormItem>
    <NButton type="primary" round :loading="submitting" @click="handleSubmit">
      {{ t('contact.form.submit') }}
    </NButton>
  </NForm>
</template>
