module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear() + 5
    }`;
  },
  check_id: (profileId, userId) => {
    return profileId === userId;
  },
  parse_comments: (comments) => {
    return JSON.parse(comments);
  }
};