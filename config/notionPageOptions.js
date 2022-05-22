const createPageOptions = (pageId, memoText, noteText) => {
  return {
    parent: {
      type: "page_id",
      page_id: pageId,
    },
    properties: {
      title: [
        {
          text: {
            content: memoText || "A New Note from Write Things",
          },
        },
      ],
    },
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: noteText,
                link: null,
              },
            },
          ],
          color: "default",
        },
      },
    ],
  };
};

module.exports = createPageOptions;
