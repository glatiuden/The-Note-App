const updateNoteRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  title: "string",
  description: "string",
};

export default updateNoteRules;
