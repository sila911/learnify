import React, { useState, useEffect } from 'react';

const VideoPage = ({ course, activeVideo, onVideoChange, onBack, completedVideos, toggleVideoCompletion }) => {
  const [note, setNote] = useState('');
  const [activeTab, setActiveTab] = useState('notes'); // 'notes', 'resources', 'quiz'
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Quiz States
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // Storage key: learnify_notes_{courseId}_{videoId}
  const storageKey = `learnify_notes_${course.id}_${activeVideo.id}`;

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
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
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
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setUserAnswers([]);
    setQuizScore(null);
    setQuizFinished(false);
  };

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
              </div>
            </div>
          </div>

          {/* Sidebar: Curriculum / Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                <h3 className="font-bold text-gray-900 dark:text-white">Course Curriculum</h3>
                <p className="text-xs text-gray-500 mt-1">{course.curriculum.length} Lessons • {course.duration} Total</p>
              </div>
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                {course.curriculum.map((video, index) => {
                  const isCompleted = completedVideos[course.id]?.includes(video.id);
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
                          {index + 1}
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
                })}
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
