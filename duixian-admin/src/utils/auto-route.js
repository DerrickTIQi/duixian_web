export default (options = {}) => {
  // 寻找views文件夹中所有的index.js
  let pageFiles = import.meta.glob("../views/**/index.js", {
    eager: true, // 非懒加载
    import: "default", // 直接拿到default中的数据
  });

  const views = import.meta.glob("../views/**/index.vue");
  return Object.entries(views).map((view) => {
    let [viewPath, component] = view;

    let pagePath = viewPath.replace("index.vue", "index.js");

    const path = viewPath.replace("../views", "").replace("/index.vue", "");

    const name = path.split("/").filter(Boolean).join("-") || "index";

    const route = {
      name,
      path,
      component,
      meta: {
        api: path.split("/")[1],
        ...pageFiles[pagePath],
      },
    };

    return route;
  });
};
