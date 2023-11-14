import { MILISECONDS } from 'shared/constants/date';
import { createFormattedTime, isSameDay } from 'shared/utils/date';

import {
  CATEGORY,
  PERIOD,
  RECRUITMENT_STATUS,
} from '@/pages/volunteers/search/_constants/filter';
import {
  SearchFilter,
  VolunteerSearchFilter,
} from '@/pages/volunteers/search/_types/filter';

const createPeriod = (startDate?: string, endDate?: string) => {
  if (!startDate) {
    return endDate;
  }
  if (!endDate) {
    return startDate;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  if (isSameDay(start, today)) {
    const diff = (end.getTime() - start.getTime()) / 1000;

    if (diff === MILISECONDS.DAY) {
      return PERIOD.WITHIN_ONE_DAY;
    }
    if (diff === MILISECONDS.DAY * 7) {
      return PERIOD.WITHIN_ONE_WEEK;
    }
    if (diff === MILISECONDS.MONTH) {
      return PERIOD.WITHIN_ONE_MONTH;
    }
  }

  return `${startDate}~${endDate}`;
};

export const createVolunteerSearchFilter = (
  filter: SearchFilter,
): VolunteerSearchFilter => {
  const { startDate, endDate, isClosed, title, content } = filter;

  const volunteerSearchFilter: VolunteerSearchFilter = {};

  if (startDate || endDate) {
    const period = createPeriod(startDate, endDate);
    volunteerSearchFilter.period = period;
  }

  if (isClosed) {
    volunteerSearchFilter.recruitmentStatus =
      isClosed === String(true) ? 'isClosed' : 'isOpen';
  }

  if (title) {
    volunteerSearchFilter.category = 'title';
  }

  if (content) {
    volunteerSearchFilter.category = 'content';
  }

  return volunteerSearchFilter;
};

export const createPeriodSearchFilter = (value: string): SearchFilter => {
  if (Object.values(PERIOD).every((period) => period !== value)) {
    return { startDate: undefined, endDate: undefined };
  }

  const startDate = new Date();
  const endDate = new Date();

  if (value === PERIOD.WITHIN_ONE_DAY) {
    endDate.setDate(startDate.getDate() + 1);
  }

  if (value === PERIOD.WITHIN_ONE_WEEK) {
    endDate.setDate(startDate.getDate() + 7);
  }

  if (value === PERIOD.WITHIN_ONE_MONTH) {
    endDate.setMonth(startDate.getMonth() + 1);
  }

  return {
    startDate: createFormattedTime(startDate, 'YYYY-MM-DD'),
    endDate: createFormattedTime(endDate, 'YYYY-MM-DD'),
  };
};

export const createRecruitmentStatusSearchFilter = (
  value: string,
): SearchFilter => {
  if (value === RECRUITMENT_STATUS.IS_CLOSED) {
    return { isClosed: String(true) };
  }

  if (value === RECRUITMENT_STATUS.IS_OPEN) {
    return { isClosed: String(false) };
  }

  return { isClosed: undefined };
};

export const createCategorySearchFilter = (value: string): SearchFilter => {
  if (value === CATEGORY.TITLE) {
    return { title: String(true), content: undefined };
  }

  if (value === CATEGORY.CONTENT) {
    return { title: undefined, content: String(true) };
  }

  return { title: undefined, content: undefined };
};
