export const getCategoryById = (categories, targetSlug) => {
  let arrId = [];
  let arrCate = [];
  let found = false;

  function traverse(nodes, idPath = [], labelPath = []) {
    if (found) return;

    for (const node of nodes) {
      // Add current node ID and label to the path
      idPath.push(node.id);
      labelPath.push(node.label);

      // Check if the current node's slug matches the target slug
      if (node.slug === targetSlug) {
        arrId = [...idPath]; // Copy path of IDs
        arrCate = [...labelPath]; // Copy path of labels
        found = true;
        return;
      }

      // Traverse children if the target is not found
      if (node.children && node.children.length > 0) {
        traverse(node.children, idPath, labelPath);
        if (found) return;
      }

      // Remove current node from the path (backtrack) only if not found
      idPath.pop();
      labelPath.pop();
    }
  }

  // Start traversal from the root
  traverse(categories);

  return { arrId, arrCate };

};


export const getCategory_ChildrenById = (category, targetId)=> {
  let result = null;
  let arrId = [];
  let arrCate = [];

  function traverse(node) {
      if (node.id === targetId) {
          result = node;
          return true; // Stop traversal if found
      }

      if (node.children && node.children.length > 0) {
          for (const child of node.children) {
              if (traverse(child)) {
                  return true; // Stop traversal if found
              }
          }
      }

      return false;
  }

  traverse(category);

  if (result) {
      function collectChildren(node) {
          arrId.push(node.id);
          arrCate.push(node.label);

          if (node.children && node.children.length > 0) {
              node.children.forEach(child => collectChildren(child));
          }
      }

      collectChildren(result);
  }

  return { arrId, arrCate };
  
}
