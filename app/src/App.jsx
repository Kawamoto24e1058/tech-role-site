import { useState } from "react";

export default function App() {
  const [step, setStep] = useState("intro");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(false);

  const startQuiz = () => {
    if (!studentId.trim() || !name.trim()) {
      alert("学生IDと名前を入力してください");
      return;
    }
    if (!agree) {
      alert("同意が必要です");
      return;
    }
    setStep("quiz");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "1rem" }}>
      <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
        <h1>技術職診断クイズ</h1>
        {step === "intro" && (
          <div>
            <input type="text" placeholder="学生ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
            <input type="text" placeholder="名前" value={name} onChange={(e) => setName(e.target.value)} />
            <label><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} /> 同意します</label>
            <button onClick={startQuiz}>開始</button>
          </div>
        )}
        {step === "quiz" && <div>進みました！{studentId} {name}</div>}
      </div>
    </div>
  );
}