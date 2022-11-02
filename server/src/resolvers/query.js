module.exports = {
  notes: async (parent, args, { models }) => {
    return await models.Note.find().limit(100);
  },
  note: async (parent, args, { models }) => {
    return await models.Note.findById(args.id);
  },
  user: async (parent, { username }, { models }) => {
    return await models.User.findOne({ username });
  },
  users: async (parent, args, { models }) => {
    return await models.User.find();
  },
  me: async (parent, args, { models, user }) => {
    return await models.User.findById(user._id);
  },
  noteFeed: async (parent, { cursor }, { models }) => {
    const limit = 10;
    let hasNextPage = false;
    // 전달된 cursor가 없으면 기본 query는 빈 배열을 할당
    // 이를 통해 DB에서 최신 노트 목록을 가져온다.
    let cursorQuery = {};

    // cursor가 있으면
    // 쿼리가 cursor 미만의 ObjectId를 가진 노트를 탐색
    if (cursor) {
      cursorQuery = { _id: { $lt: cursor } };
    }

    // DB에서 limit + 1개의 노트를 탐색하고 최신순으로 정렬
    let notes = await models.Note.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1);

    // 노트 개수가 limit를 초과하면
    // hasNextPage를 true로 설정하고 notes를 limit까지 자름

    if (notes.length > limit) {
      hasNextPage = true;
      notes = notes.slice(0 - 1);
    }

    // 새 cursor는 피드 배열 마지막 항목의 몽고 객체 ID
    const newCursor = notes[notes.length - 1]._id;

    return {
      notes,
      cursor: newCursor,
      hasNextPage
    };
  }
};
