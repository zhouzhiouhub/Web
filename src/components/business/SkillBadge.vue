<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NTag } from 'naive-ui';
import type { Skill, SkillLevel } from '@/types';

defineProps<{
  skill: Skill;
}>();

const { t } = useI18n();

const levelColors: Record<SkillLevel, 'default' | 'info' | 'success' | 'warning'> = {
  beginner: 'default',
  intermediate: 'info',
  advanced: 'success',
  expert: 'warning',
};
</script>

<template>
  <div class="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:border-primary/50">
    <span class="text-sm font-medium text-foreground">{{ skill.name }}</span>
    <NTag
      size="small"
      :type="levelColors[skill.level]"
      round
      :bordered="false"
    >
      {{ t(`skill.level.${skill.level}`) }}
    </NTag>
  </div>
</template>
