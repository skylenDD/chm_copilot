import React, { useEffect, useMemo, useState } from "react";

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]); // { id, role: 'user' | 'assistant', content: string }
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const userMessagesForBackend = useMemo(() => {
    // 只把用户消息喂给模型；模型会在后端根据 base schema 做“更新/生成完整schema”
    return chat.filter(m => m.role === "user").map(m => ({ role: "user", content: m.content }));
  }, [chat]);

  const handleSend = async () => {
    const content = input.trim();
    if (!content || loading) return;

    setError("");
    setLoading(true);

    const nextChat = [...chat, { id: uid(), role: "user", content }];
    setChat(nextChat);
    setInput("");

    try {
      const response = await fetch("/api/genSchema", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Copilot 风格：把“对话历史”作为上下文
          messages: nextChat.filter(m => m.role === "user").map(m => ({ role: m.role, content: m.content })),
          // base schema：用于“增量修改/更新”，而不是每次都从零生成
          schema,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "请求失败");
      }
      if (data?.error) {
        setError(data.error);
      }

      if (data?.schema) {
        setSchema(data.schema);
        setChat(prev => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: "已根据对话生成/更新页面 Schema（下方展示）。",
          },
        ]);
      } else {
        setChat(prev => [
          ...prev,
          { id: uid(), role: "assistant", content: "未能解析出有效 Schema，请查看错误信息。" },
        ]);
      }
    } catch (e) {
      setError(e?.message || "请求失败");
      setChat(prev => [...prev, { id: uid(), role: "assistant", content: "请求失败，请稍后重试。" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setChat([]);
    setSchema(null);
    setInput("");
    setError("");
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 920, margin: "28px auto", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <h2 style={{ marginBottom: 16 }}>Copilot 对话式 Schema 生成器</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
        <div style={{ border: "1px solid #eee", borderRadius: 10, padding: 14 }}>
          <div style={{ height: 360, overflow: "auto", paddingRight: 6 }}>
            {chat.length === 0 ? (
              <div style={{ color: "#999", padding: 8 }}>
                先描述你要的表单/页面，然后像 Copilot 一样继续追问（例如“再加一个手机号输入框”）。
              </div>
            ) : (
              chat.map(m => (
                <div key={m.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
                    {m.role === "user" ? "你" : "Copilot"}：
                  </div>
                  <div
                    style={{
                      whiteSpace: "pre-wrap",
                      background: m.role === "user" ? "#f6f6ff" : "#f3fbf7",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #eee",
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              ))
            )}
          </div>

          {error ? (
            <div style={{ marginTop: 10, color: "#b00020", background: "#fff0f0", border: "1px solid #ffd2d2", padding: 10, borderRadius: 8 }}>
              {error}
            </div>
          ) : null}

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="描述你要的表单/页面组件，比如：生成一个登录表单，再加一个“记住我”开关。"
              style={{
                flex: 1,
                minHeight: 44,
                maxHeight: 120,
                resize: "vertical",
                padding: 10,
                fontSize: 14,
                borderRadius: 10,
                border: "1px solid #ddd",
              }}
              onKeyDown={e => {
                // Ctrl+Enter 发送
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button
                onClick={handleSend}
                disabled={loading}
                style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" }}
              >
                {loading ? "生成中..." : "发送"}
              </button>
              <button
                onClick={handleReset}
                disabled={loading}
                style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer", background: "#fafafa" }}
              >
                重置
              </button>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#999" }}>提示：按 `Ctrl+Enter` 发送。</div>
        </div>

        <div style={{ border: "1px solid #eee", borderRadius: 10, padding: 14 }}>
          <div style={{ marginBottom: 10, fontWeight: 600 }}>生成的 Schema 预览</div>
          {schema ? (
            <details style={{ border: "1px solid #eee", borderRadius: 10, padding: 12, background: "#fff" }}>
              <summary style={{ cursor: "pointer", color: "#666" }}>点击查看生成的 Schema</summary>
              <pre
                style={{
                  marginTop: 10,
                  maxHeight: 280,
                  overflow: "auto",
                  background: "#0b1020",
                  color: "#d7e0ff",
                  padding: 12,
                  borderRadius: 10,
                  fontSize: 12,
                  border: "1px solid #1d2a55",
                }}
              >
                {JSON.stringify(schema, null, 2)}
              </pre>
            </details>
          ) : (
            <div style={{ color: "#aaa", padding: 10 }}>Schema 生成结果会展示在这里</div>
          )}
        </div>
      </div>
    </div>
  );
}