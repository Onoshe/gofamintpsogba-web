

 export function groupByPrefix(array, key) {
    if(!array?.length || !key) return [];

    return array?.reduce((acc, item) => {
        // Extract the prefix from the name
        const prefix = item?.[key]?.split('_')[0];

        // Initialize the group if it doesn't exist
        if (!acc[prefix]) {
            acc[prefix] = [];
        }

        // Add the current item to the appropriate group
        acc[prefix]?.push(item);

        return acc;
    }, {});
}


export function groupClientsTables(array, key) {
  if(!array?.length || !key) return [];

  return array?.reduce((acc, item) => {
      // Extract the prefix from the name
      const prefix = item?.[key]?.split('_')[0];

      // Initialize the group if it doesn't exist
      if (!acc[prefix]) {
          acc[prefix] = [];
      }

      // Add the current item to the appropriate group
      acc[prefix]?.push(item);

      return acc;
  }, {});
}


