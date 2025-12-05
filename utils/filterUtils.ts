import type { CategoryType } from "@/constants/categories";

export function matchesCategoryString(categoryString: string, targetGenres: string[]): boolean {
  return targetGenres.some((genre) => categoryString.includes(genre));
}

export function matchesTagArray(tags: string[], targetGenres: string[]): boolean {
  return tags.some((tag) => targetGenres.some((genre) => tag.includes(genre)));
}

export function filterByCategory<T>(
  items: T[],
  selectedCategories: CategoryType[],
  categoryMapper: Record<CategoryType, string>,
  getCategoryData: (item: T) => string | string[],
): T[] {
  const hasCategoryFilter = selectedCategories.length > 0 && !selectedCategories.includes("all");

  if (!hasCategoryFilter) {
    return items;
  }

  const targetGenres = selectedCategories.map((catId) => categoryMapper[catId]).filter(Boolean);

  return items.filter((item) => {
    const categoryData = getCategoryData(item);

    if (typeof categoryData === "string") {
      return matchesCategoryString(categoryData, targetGenres);
    }

    if (Array.isArray(categoryData)) {
      return matchesTagArray(categoryData, targetGenres);
    }

    return false;
  });
}
