// Function to filter products by category
export const filterProductsByCategory = (productsArray, category) => {
  const filteredProducts = productsArray.filter(
    (product) => product.category === category
  );

  if (filteredProducts.length === 0) {
    return [];
  }

  return filteredProducts;
};

// Function to get unique categories
export const getUniqueCategories = (productsArray) => {
  const categories = productsArray?.map((product) => product.category); // Extract categories
  const uniqueCategories = [...new Set(categories)]; // Remove duplicates
  return uniqueCategories;
};

// Function to count category occurrences
export const countCategoryOccurrences = (productsArray) => {
  const categoryCounts = {};

  productsArray.forEach((product) => {
    const category = product.category;
    if (categoryCounts[category]) {
      categoryCounts[category]++;
    } else {
      categoryCounts[category] = 1;
    }
  });

  return categoryCounts;
};
