// See mit-license.txt for license info

export default function extract(model, path) {
  return extractFromCache(model._root.cache, path);
}

// pull things out of a falcor graph, following
// refs and unboxing values as necessary
export function extractFromCache(obj, path, idx = 0, root = obj) {
  const isRef = obj && obj.$type === 'ref';
  if (isRef) {
    var newPath = obj.value.concat(path.slice(idx));
    return extractFromCache(root, newPath);
  } else if (path.length - idx === 0) {
    return obj && obj.$type ? obj.value : obj;
  } else if (obj === null || obj === undefined) {
    return obj;
  } else {
    var step = path[idx];
    return extractFromCache(obj[step], path, idx + 1, root);
  }
}
