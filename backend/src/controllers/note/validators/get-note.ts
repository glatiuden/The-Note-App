const getNoteRules = {
  note_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
};

export default getNoteRules;
