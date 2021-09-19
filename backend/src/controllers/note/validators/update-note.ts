const updateNoteRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  title: ["required", "string"],
  description: ["required", "string"],
};

export default updateNoteRules;
