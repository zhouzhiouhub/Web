<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NCard, NCollapse, NCollapseItem } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { contactSocialLinks } from '@/data/social';
import { contactFaqs } from '@/data/contact';
import { SITE_EMAIL, SITE_PHONE } from '@/data/site';
import RevealContact from '@/components/common/RevealContact.vue';
import ContactForm from '@/components/business/ContactForm.vue';

const { t } = useI18n();

useSeo({
  title: () => t('contact.title'),
  description: () => t('contact.seoDescription'),
});

const getIconStyle = (src?: string, scale = 1) => [
  `--svg-icon-url: url("${src ?? '/email.svg'}")`,
  `--svg-icon-scale: ${scale}`,
].join('; ');
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      {{ t('contact.title') }}
    </h1>
    <p class="mb-4 text-muted">
      {{ t('contact.description') }}
    </p>
    <p class="mb-8 max-w-prose text-sm leading-6 text-muted">
      {{ t('contact.maskedHint') }}
    </p>

    <div class="mb-12 grid gap-6 lg:grid-cols-2">
      <NCard>
        <h2 class="mb-3 text-lg font-semibold text-foreground">{{ t('contact.intent.title') }}</h2>
        <p class="mb-6 text-sm leading-6 text-muted">{{ t('contact.intent.description') }}</p>
        <h2 class="mb-3 text-lg font-semibold text-foreground">{{ t('contact.responseTime.title') }}</h2>
        <p class="text-sm leading-6 text-muted">{{ t('contact.responseTime.description') }}</p>
      </NCard>
      <NCard>
        <h2 class="mb-4 text-lg font-semibold text-foreground">{{ t('contact.channels') }}</h2>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm text-muted">{{ t('contact.email') }}</p>
            <RevealContact type="email" :value="SITE_EMAIL" />
          </div>
          <div>
            <p class="mb-2 text-sm text-muted">{{ t('contact.phone') }}</p>
            <RevealContact type="phone" :value="SITE_PHONE" />
          </div>
        </div>
      </NCard>
    </div>

    <div class="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NCard
        v-for="social in contactSocialLinks"
        :key="social.id"
        class="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <a
          :href="social.url"
          target="_blank"
          rel="noopener"
          class="flex flex-col items-center gap-4 py-4"
        >
          <span
            aria-hidden="true"
            class="themed-svg-icon size-10 text-primary"
            :style="getIconStyle(social.iconSrc, social.iconScale)"
          />
          <span class="text-sm font-medium text-foreground">
            {{ social.labelKey ? t(social.labelKey) : social.label }}
          </span>
        </a>
      </NCard>
    </div>

    <section class="mb-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h2 class="mb-2 text-xl font-bold text-foreground">{{ t('contact.form.title') }}</h2>
        <p class="mb-6 text-sm text-muted">{{ t('contact.form.description') }}</p>
        <ContactForm />
      </div>
      <div>
        <h2 class="mb-6 text-xl font-bold text-foreground">{{ t('contact.faq.title') }}</h2>
        <NCollapse>
          <NCollapseItem
            v-for="faq in contactFaqs"
            :key="faq.id"
            :title="t(faq.questionKey)"
            :name="faq.id"
          >
            <p class="text-sm leading-6 text-muted">{{ t(faq.answerKey) }}</p>
          </NCollapseItem>
        </NCollapse>
      </div>
    </section>
  </div>
</template>
