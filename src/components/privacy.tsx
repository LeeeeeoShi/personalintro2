export default function Privacy() {
  return (
    <section className="py-16 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <details className="group">
          <summary className="text-xs text-gray-soft/50 font-light cursor-pointer hover:text-gray-soft transition-colors list-none flex items-center gap-2">
            <span className="inline-block transition-transform duration-200 group-open:rotate-90">›</span>
            隐私政策
          </summary>
          <div className="mt-4 text-xs text-gray-soft/40 font-light leading-relaxed space-y-3">
            <p>
              本网站仅收集您主动提交的信息（如通过联系表单提供的邮箱地址），用于回复您的询问。该信息不会与第三方共享。
            </p>
            <p>
              本网站不使用第三方跟踪脚本或分析工具。您的浏览行为不会被记录或分析。
            </p>
            <p>
              如您对本隐私政策有任何疑问，请通过联系页面发送消息。
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
