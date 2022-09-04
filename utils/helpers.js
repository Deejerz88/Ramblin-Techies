const { DateTime } = require("luxon");

module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear() + 5
    }`;
  },
  check_id: (dashboardId, userId) => {
    return dashboardId === userId;
  },
  parse_comments: (comments) => {
    console.log(">>>>helper comments", comments);
    comments = comments.map((comment) => {
      return {
        ...comment,
        createdAt: DateTime.fromJSDate(comment.createdAt).toLocaleString(
          DateTime.DATETIME_SHORT_WITH_SECONDS
        ).replace(',','<br/>'),
        user: { name: comment["user.name"], id: comment["user.id"] },
      };
    });
    return comments;
  },
};
