import React, { useState, useEffect, useRef } from 'react';

// VS Code-style autocomplete list
const suggestionList = [
  { label: 'console.log()', value: 'console.log()' },
  { label: 'const', value: 'const ' },
  { label: 'let', value: 'let ' },
  { label: 'function', value: 'function ' },
  { label: 'return', value: 'return ' },
  { label: 'document.querySelector()', value: 'document.querySelector(\'\')' },
  { label: 'document.getElementById()', value: 'document.getElementById(\'\')' },
  { label: 'addEventListener()', value: 'addEventListener(\'\', () => {})' },
  { label: 'div tag', value: '<div>\n  \n</div>' },
  { label: 'button tag', value: '<button></button>' },
  { label: 'style tag', value: '<style>\n  \n</style>' },
  { label: 'script tag', value: '<script>\n  \n</script>' },
  { label: 'class=""', value: 'class=""' },
  { label: 'onclick=""', value: 'onclick=""' },
  { label: 'window.alert()', value: 'window.alert(\'\')' },
  { label: 'setTimeout()', value: 'setTimeout(() => {\n  \n}, 1000);' }
];

const VideoPage = ({ course, activeVideo, onVideoChange, onBack, completedVideos, toggleVideoCompletion, onQuizComplete }) => {
  const preRef = useRef(null);

  const handleScroll = (e) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.target.scrollTop;
      preRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  const [note, setNote] = useState('');
  const [activeTab, setActiveTab] = useState('notes'); // 'notes', 'resources', 'quiz', 'playground'
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sandbox States
  const [sandboxCode, setSandboxCode] = useState(() => {
    if (course.category === 'Language' || course.category === 'Frontend' || course.category === 'Development') {
      return `<!-- Modern Web Playground -->
<div class="sandbox-card">
  <h1>Hello Learnify!</h1>
  <p>Learn, Code, and Build with Sila Sem.</p>
  <button onclick="greetUser()">Click Me!</button>
</div>

<style>
  body {
    font-family: system-ui, -apple-system, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    margin: 0;
    background: #0f172a;
    color: white;
  }
  .sandbox-card {
    text-align: center;
    padding: 30px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  h1 {
    color: #10b981;
    margin-top: 0;
  }
  button {
    background: #10b981;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 15px;
    transition: 0.2s;
  }
  button:hover {
    background: #059669;
  }
</style>

<script>
  function greetUser() {
    alert("Welcome to the Learnify Sandbox, Sila Sem!");
  }
</script>`;
    }
    return `/* Python/Java Console Playground */
function solve() {
  console.log("Running Data Structures / Algorithm Check...");
  let array = [5, 2, 9, 1, 5, 6];
  
  // Custom bubble sort simulation
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j+1]) {
        let temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
    }
  }
  
  console.log("Sorted Array Result:", array);
}

solve();`;
  });
  const [srcDoc, setSrcDoc] = useState('');

  // Autocomplete IntelliSense States
  const [caretIndex, setCaretIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(0);
  const [suggestionsPos, setSuggestionsPos] = useState({ top: 0, left: 0 });
  const [currentWord, setCurrentWord] = useState('');

  // Quiz States
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // Storage keys
  const storageKey = `learnify_notes_${course.id}_${activeVideo.id}`;

  // Save last watched lesson state
  useEffect(() => {
    localStorage.setItem('learnify_last_watched', JSON.stringify({
      courseId: course.id,
      videoId: activeVideo.id,
      videoTitle: activeVideo.title
    }));
  }, [activeVideo, course]);

  // Load note from local storage when active video changes
  useEffect(() => {
    const savedNote = localStorage.getItem(storageKey);
    setNote(savedNote || '');
    setIsPreviewMode(false);
  }, [activeVideo, storageKey]);

  // Save note to local storage
  const handleSaveNote = (e) => {
    const value = e.target.value;
    setNote(value);
    localStorage.setItem(storageKey, value);
  };

  const currentIdx = course.curriculum.findIndex(v => v.id === activeVideo.id);
  const nextVideo = currentIdx !== -1 && currentIdx < course.curriculum.length - 1 
    ? course.curriculum[currentIdx + 1] 
    : null;

  const handleNextUp = () => {
    if (nextVideo) {
      onVideoChange(nextVideo);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Simple Markdown Parser (Regex)
  const parseMarkdown = (text) => {
    if (!text) return '';
    let html = text
      .replace(/&/g, "@amp;")
      .replace(/</g, "@lt;")
      .replace(/>/g, "@gt;");
    // Escape standard replacements
    html = html.replace(/@amp;/g, "&amp;").replace(/@lt;/g, "&lt;").replace(/@gt;/g, "&gt;");
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h4 class="text-md font-bold mt-3 mb-1.5 text-gray-900 dark:text-white">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2 text-gray-900 dark:text-white">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 class="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white">$1</h2>');
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>');
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    // Inline code
    html = html.replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-900 text-red-500 rounded px-1.5 py-0.5 text-xs font-mono">$1</code>');
    // Lists
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="list-disc ml-5 my-1.5 text-gray-700 dark:text-gray-300">$1</li>');
    // Line breaks
    html = html.replace(/\n/g, '<br />');
    return html;
  };

  // Run Sandbox Code Compiler
  const handleRunCode = () => {
    if (sandboxCode.includes('<script>') || sandboxCode.includes('</div>') || sandboxCode.includes('<style>')) {
      setSrcDoc(sandboxCode);
    } else {
      let logs = [];
      const customConsole = {
        log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')),
        error: (...args) => logs.push("Error: " + args.join(' '))
      };
      try {
        const run = new Function('console', sandboxCode);
        run(customConsole);
        setSrcDoc(`<html><body style="background:#0f172a;color:#10b981;font-family:monospace;padding:20px;margin:0;"><h3>Console Output:</h3><hr style="border-color:#1e293b;"/><pre style="white-space:pre-wrap;font-size:14px;line-height:1.5;">${logs.join('\n') || 'Code executed successfully. No console.log outputs.'}</pre></body></html>`);
      } catch (err) {
        setSrcDoc(`<html><body style="background:#0f172a;color:#f43f5e;font-family:monospace;padding:20px;margin:0;"><h3>Execution Error:</h3><hr style="border-color:#1e293b;"/><pre style="white-space:pre-wrap;font-size:14px;line-height:1.5;">${err.message}</pre></body></html>`);
      }
    }
  };

  // Run initial sandbox load
  useEffect(() => {
    if (activeTab === 'playground') {
      handleRunCode();
    }
  }, [activeTab]);

  // Syntax Highlighter
  const highlightSyntax = (code) => {
    if (!code) return '';
    let html = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    const isHtml = code.trim().startsWith('<') || code.includes('</') || code.includes('class=') || code.includes('style=');
    
    if (isHtml) {
      // Tags
      html = html.replace(/(&lt;\/?[a-zA-Z0-9:-]+)/g, '<span class="text-blue-400 font-bold">$1</span>');
      // Attributes
      html = html.replace(/(\s[a-zA-Z0-9:-]+=)/g, '<span class="text-purple-400">$1</span>');
      // Attribute values
      html = html.replace(/("[^"]*")/g, '<span class="text-amber-300">$1</span>');
      // Comments
      html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-gray-500 italic">$1</span>');
    } else {
      // Keywords
      const keywords = /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|import|export|from|default|null|undefined|true|false)\b/g;
      html = html.replace(keywords, '<span class="text-purple-400 font-bold">$1</span>');
      
      // Built-ins
      const builtins = /\b(console|log|error|warn|info|Math|JSON|Array|Object|String|Number|Function|solve|greetUser)\b/g;
      html = html.replace(builtins, '<span class="text-blue-400">$1</span>');
      
      // Strings
      html = html.replace(/("[^"]*")/g, '<span class="text-amber-300">$1</span>');
      html = html.replace(/('[^']*')/g, '<span class="text-amber-300">$1</span>');
      html = html.replace(/(`[^`]*`)/g, '<span class="text-amber-300">$1</span>');
      
      // Numbers
      html = html.replace(/\b([0-9]+)\b/g, '<span class="text-teal-400">$1</span>');
      
      // Comments
      html = html.replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>');
    }
    return html;
  };

  // Autocomplete IntelliSense Suggestion Filter Effect
  useEffect(() => {
    if (activeTab !== 'playground') return;
    const textBefore = sandboxCode.substring(0, caretIndex);
    const match = textBefore.match(/[\w<>-]+$/);
    const word = match ? match[0] : '';
    
    if (word.length >= 1) {
      const filtered = suggestionList.filter(s => 
        s.label.toLowerCase().startsWith(word.toLowerCase()) && 
        s.label.toLowerCase() !== word.toLowerCase()
      );
      if (filtered.length > 0) {
        setSuggestions(filtered);
        setShowSuggestions(true);
        
        // Estimate position
        const lines = textBefore.split('\n');
        const lineNo = lines.length - 1;
        const colNo = lines[lines.length - 1].length - word.length;
        
        setSuggestionsPos({
          top: Math.min(lineNo * 20 + 26, 300),
          left: Math.min(colNo * 8.4 + 16, 250)
        });
        setActiveSuggestionIdx(0);
        setCurrentWord(word);
        return;
      }
    }
    setShowSuggestions(false);
  }, [sandboxCode, caretIndex, activeTab]);

  // Apply Autocomplete Suggestion
  const applySuggestion = (sug) => {
    const textBefore = sandboxCode.substring(0, caretIndex - currentWord.length);
    const textAfter = sandboxCode.substring(caretIndex);
    const newCode = textBefore + sug.value + textAfter;
    setSandboxCode(newCode);
    setShowSuggestions(false);
    
    // Set caret position in next tick
    setTimeout(() => {
      const textarea = document.querySelector('.playground-textarea');
      if (textarea) {
        const newPos = textBefore.length + sug.value.length;
        textarea.focus();
        textarea.setSelectionRange(newPos, newPos);
        setCaretIndex(newPos);
      }
    }, 0);
  };

  // Keyboard navigation inside editor for suggestions
  const handleKeyDown = (e) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestionIdx(prev => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestionIdx(prev => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        applySuggestion(suggestions[activeSuggestionIdx]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    }
  };

  // Handle Quiz Submissions
  const quizQuestions = course.quiz || [];
  const handleOptionSelect = (optionIdx) => {
    setSelectedAnswerIdx(optionIdx);
  };

  const handleNextQuestion = () => {
    if (selectedAnswerIdx === null) return;
    const answers = [...userAnswers];
    answers[currentQuestionIdx] = selectedAnswerIdx;
    setUserAnswers(answers);
    setSelectedAnswerIdx(null);

    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      answers.forEach((ans, idx) => {
        if (ans === quizQuestions[idx].answer) {
          correctCount++;
        }
      });
      setQuizScore(correctCount);
      setQuizFinished(true);

      if (onQuizComplete) {
        onQuizComplete(course.id, correctCount);
      }
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setUserAnswers([]);
    setQuizScore(null);
    setQuizFinished(false);
  };

  // Filter Playlist Curriculum
  const filteredCurriculum = course.curriculum.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pt-20 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary transition group mb-2"
            >
              <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition"></i>
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {course.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
               {course.category}
             </span>
             <span className="text-gray-500 dark:text-gray-400 text-sm">
               Lesson {course.curriculum.findIndex(v => v.id === activeVideo.id) + 1} of {course.curriculum.length}
             </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Player and Tabs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player Area */}
            <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-xl ring-1 ring-gray-200 dark:ring-gray-800">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            {/* Tabs Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="flex overflow-x-auto whitespace-nowrap border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 px-6 pt-4 gap-4 md:gap-6 scrollbar-none">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-3 font-semibold text-sm border-b-2 transition flex items-center gap-1.5 shrink-0 focus:outline-none ${
                    activeTab === 'notes' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-note-sticky"></i>
                  Notes
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`pb-3 font-semibold text-sm border-b-2 transition flex items-center gap-1.5 shrink-0 focus:outline-none ${
                    activeTab === 'resources' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-folder-open"></i>
                  Resources
                </button>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`pb-3 font-semibold text-sm border-b-2 transition flex items-center gap-1.5 shrink-0 focus:outline-none ${
                    activeTab === 'quiz' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-circle-question"></i>
                  <span className="hidden sm:inline">Knowledge </span>Quiz
                </button>
                <button
                  onClick={() => setActiveTab('playground')}
                  className={`pb-3 font-semibold text-sm border-b-2 transition flex items-center gap-1.5 shrink-0 focus:outline-none ${
                    activeTab === 'playground' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-code"></i>
                  Code Playground
                </button>
              </div>

              <div className="p-6">
                {/* Tab 1: Notes Section */}
                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">My Notes</h3>
                        <p className="text-xs text-gray-400">Supports # Headers, **bold**, *italics*, `code`, and - lists</p>
                      </div>
                      <button
                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                        className="px-3 py-1.5 text-xs font-semibold bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-lg transition flex items-center gap-1.5"
                      >
                        {isPreviewMode ? (
                          <>
                            <i className="fa-solid fa-pen text-[10px]"></i>
                            Edit Note
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-eye text-[10px]"></i>
                            Preview MD
                          </>
                        )}
                      </button>
                    </div>

                    {isPreviewMode ? (
                      <div 
                        className="w-full h-64 p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 overflow-y-auto leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(note) || '<p class="text-gray-400 italic">No notes written yet. Start typing to auto-save.</p>' }}
                      ></div>
                    ) : (
                      <textarea
                        value={note}
                        onChange={handleSaveNote}
                        placeholder="Write your notes for this lesson here... Markdown formatting is supported."
                        className="w-full h-64 p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none leading-relaxed font-sans"
                      ></textarea>
                    )}
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      <span>Autosaved to local storage specifically for this lesson.</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Resources Section */}
                {activeTab === 'resources' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">Course Materials</h3>
                      <p className="text-sm text-gray-500">Download files and view documentation related to this course.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <a href="#" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition group">
                        <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-950/30 text-red-500 flex items-center justify-center text-lg shrink-0">
                          <i className="fa-solid fa-file-pdf"></i>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-primary transition truncate">CheatSheet.pdf</p>
                          <span className="text-xs text-gray-400">PDF Document • 2.4 MB</span>
                        </div>
                      </a>
                      <a href="#" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition group">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/30 text-blue-500 flex items-center justify-center text-lg shrink-0">
                          <i className="fa-solid fa-file-code"></i>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-primary transition truncate">SourceCode_Starter.zip</p>
                          <span className="text-xs text-gray-400">Zip Archive • 8.7 MB</span>
                        </div>
                      </a>
                      <a href="#" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition group">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/30 text-amber-500 flex items-center justify-center text-lg shrink-0">
                          <i className="fa-solid fa-book"></i>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-primary transition truncate">Official Documentation</p>
                          <span className="text-xs text-gray-400">Web Link • External</span>
                        </div>
                      </a>
                      <a href="#" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition group">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/30 text-purple-500 flex items-center justify-center text-lg shrink-0">
                          <i className="fa-solid fa-comments"></i>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-primary transition truncate">Student Discussion Forum</p>
                          <span className="text-xs text-gray-400">Web Link • Internal</span>
                        </div>
                      </a>
                    </div>
                  </div>
                )}

                {/* Tab 3: Interactive Quiz Section */}
                {activeTab === 'quiz' && (
                  <div className="space-y-6">
                    {quizQuestions.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-8 italic">No quizzes available for this course yet.</p>
                    ) : quizFinished ? (
                      <div className="text-center py-6 space-y-6 max-w-md mx-auto">
                        <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary flex items-center justify-center mx-auto text-primary animate-bounce">
                          <span className="text-2xl font-bold">{quizScore}/{quizQuestions.length}</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {quizScore === quizQuestions.length ? 'Perfect Score!' : 'Quiz Finished!'}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {quizScore === quizQuestions.length 
                              ? 'Awesome job! You have fully mastered the concepts in this course.'
                              : 'Good effort! Review the lessons and try again to get a perfect score.'}
                          </p>
                        </div>
                        <button
                          onClick={handleRetakeQuiz}
                          className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-hover transition text-sm"
                        >
                          Retake Quiz
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-700 pb-3">
                          <span className="font-bold text-primary">QUESTION {currentQuestionIdx + 1} OF {quizQuestions.length}</span>
                          <span className="text-gray-400">{Math.round(((currentQuestionIdx) / quizQuestions.length) * 100)}% Complete</span>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-relaxed">
                            {quizQuestions[currentQuestionIdx].question}
                          </h4>
                        </div>

                        <div className="space-y-3">
                          {quizQuestions[currentQuestionIdx].options.map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleOptionSelect(idx)}
                              className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition flex items-center gap-3 ${
                                selectedAnswerIdx === idx
                                  ? 'bg-primary/10 border-primary text-primary'
                                  : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                            >
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                                selectedAnswerIdx === idx
                                  ? 'bg-primary border-primary text-white'
                                  : 'border-gray-300 text-gray-500'
                              }`}>
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
                          <button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswerIdx === null}
                            className={`px-6 py-2.5 rounded-xl font-bold transition flex items-center gap-2 text-sm ${
                              selectedAnswerIdx !== null
                                ? 'bg-primary text-white hover:bg-primary-hover shadow-md'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <span>{currentQuestionIdx === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                            <i className="fa-solid fa-arrow-right text-xs"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 4: Code Playground Section */}
                {activeTab === 'playground' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">Code Playground</h3>
                        <p className="text-xs text-gray-400">Write web layouts (HTML/CSS) or execute vanilla JS scripts</p>
                      </div>
                      <button
                        onClick={handleRunCode}
                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 text-sm"
                      >
                        <i className="fa-solid fa-play"></i>
                        Run Code
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96">
                      <div className="relative w-full h-full bg-gray-900 border border-gray-700 rounded-xl overflow-hidden font-mono text-sm leading-relaxed">
                        <pre 
                          ref={preRef}
                          className="absolute inset-0 p-4 margin-0 bg-transparent text-gray-300 pointer-events-none select-none whitespace-pre-wrap break-all overflow-auto font-mono text-sm leading-relaxed border-none scrollbar-none"
                          style={{ boxSizing: 'border-box' }}
                        >
                          <code dangerouslySetInnerHTML={{ __html: highlightSyntax(sandboxCode) }}></code>
                        </pre>
                        <textarea
                          value={sandboxCode}
                          onChange={(e) => {
                            setSandboxCode(e.target.value);
                            setCaretIndex(e.target.selectionStart);
                          }}
                          onKeyDown={handleKeyDown}
                          onScroll={handleScroll}
                          onClick={(e) => setCaretIndex(e.target.selectionStart)}
                          onKeyUp={(e) => setCaretIndex(e.target.selectionStart)}
                          placeholder="Write code here..."
                          className="playground-textarea absolute inset-0 p-4 margin-0 bg-transparent text-transparent caret-white resize-none outline-none border-none font-mono text-sm leading-relaxed whitespace-pre-wrap break-all overflow-auto focus:ring-0"
                          style={{ boxSizing: 'border-box' }}
                        ></textarea>

                        {/* Autocomplete Suggestion Popup */}
                        {showSuggestions && suggestions.length > 0 && (
                          <div 
                            className="absolute bg-gray-800 border border-gray-700 text-gray-200 rounded-lg shadow-2xl z-50 w-60 max-h-40 overflow-y-auto"
                            style={{ 
                              top: `${suggestionsPos.top}px`, 
                              left: `${suggestionsPos.left}px`
                            }}
                          >
                            {suggestions.map((sug, idx) => (
                              <button
                                key={idx}
                                onClick={() => applySuggestion(sug)}
                                className={`w-full text-left px-3 py-1.5 text-xs font-mono transition flex items-center justify-between ${
                                  activeSuggestionIdx === idx 
                                    ? 'bg-primary text-white font-bold' 
                                    : 'hover:bg-gray-700 text-gray-300'
                                }`}
                              >
                                <span>{sug.label}</span>
                                <span className="opacity-50 text-[10px]">Tab/Enter</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="w-full h-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white">
                        {srcDoc ? (
                          <iframe
                            srcDoc={srcDoc}
                            title="Sandbox Output"
                            sandbox="allow-scripts"
                            className="w-full h-full border-none"
                          ></iframe>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-900/50">
                            <i className="fa-solid fa-terminal text-2xl mb-2"></i>
                            <span className="text-xs">Click Run Code to see output</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: Curriculum / Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                <h3 className="font-bold text-gray-900 dark:text-white">Course Curriculum</h3>
                <p className="text-xs text-gray-500 mt-1 mb-4">{course.curriculum.length} Lessons • {course.duration} Total</p>
                
                {/* Playlist Search Bar */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                    <i className="fa-solid fa-magnifying-glass text-xs"></i>
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search lessons..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              <div className="max-h-[calc(100vh-340px)] overflow-y-auto">
                {filteredCurriculum.length === 0 ? (
                  <p className="text-gray-400 dark:text-gray-500 text-center py-8 text-xs italic">No lessons match search.</p>
                ) : (
                  filteredCurriculum.map((video, index) => {
                    const isCompleted = completedVideos[course.id]?.includes(video.id);
                    // Match visual index in real course array
                    const originalIdx = course.curriculum.findIndex(v => v.id === video.id);
                    return (
                      <div
                        key={video.id}
                        className={`w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-700 transition ${
                          activeVideo.id === video.id 
                            ? 'bg-primary/5 border-l-4 border-l-primary' 
                            : 'border-l-4 border-l-transparent'
                        }`}
                      >
                        <button
                          onClick={() => {
                            onVideoChange(video);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex items-center gap-4 text-left flex-grow min-w-0"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${activeVideo.id === video.id ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                            {originalIdx + 1}
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className={`text-sm font-semibold truncate ${activeVideo.id === video.id ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}`}>
                              {video.title}
                            </p>
                            <span className="text-xs text-gray-400">{video.duration}</span>
                          </div>
                        </button>

                        {/* Interactive Watch Status Checkbox */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVideoCompletion(course.id, video.id);
                          }}
                          className="text-lg flex items-center justify-center ml-2 text-gray-300 dark:text-gray-600 hover:text-primary transition shrink-0"
                          title={isCompleted ? "Mark incomplete" : "Mark complete"}
                        >
                          {isCompleted ? (
                            <i className="fa-solid fa-circle-check text-primary text-xl"></i>
                          ) : (
                            <i className="fa-regular fa-circle text-gray-300 dark:text-gray-600 hover:text-primary transition text-xl"></i>
                          )}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={handleNextUp}
                  disabled={!nextVideo}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition shadow-md ${
                    nextVideo 
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  }`}
                >
                   {nextVideo ? 'Next Up' : 'Course Completed!'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
