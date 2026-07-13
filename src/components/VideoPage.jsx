import React, { useState, useEffect } from 'react';

const VideoPage = ({ course, activeVideo, onVideoChange, onBack }) => {
  const [note, setNote] = useState('');

  // Storage key: learnify_notes_{courseId}_{videoId}
  const storageKey = `learnify_notes_${course.id}_${activeVideo.id}`;

  // Load note from local storage when active video changes
  useEffect(() => {
    const savedNote = localStorage.getItem(storageKey);
    setNote(savedNote || '');
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

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pt-20 pb-12">
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
          {/* Main Content: Player and Notes */}
          <div className="lg:col-span-2 space-y-8">
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

            {/* Video Info */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {activeVideo.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Playing from "{course.title}" • {activeVideo.duration}
              </p>
            </div>

            {/* Notes Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <i className="fa-solid fa-note-sticky text-accent"></i>
                  My Notes
                </h2>
                <span className="text-xs text-gray-400">Autosaved to Local Storage</span>
              </div>
              <textarea
                value={note}
                onChange={handleSaveNote}
                placeholder="Write your notes for this lesson here..."
                className="w-full h-64 p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none"
              ></textarea>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <i className="fa-solid fa-circle-info"></i>
                Notes are private and saved specifically for this video lesson.
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
                {course.curriculum.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => {
                      onVideoChange(video);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center gap-4 p-4 text-left border-b border-gray-50 dark:border-gray-700 transition hover:bg-gray-50 dark:hover:bg-gray-700 ${activeVideo.id === video.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
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
                    {activeVideo.id === video.id && (
                      <div className="text-primary">
                        <i className="fa-solid fa-circle-play"></i>
                      </div>
                    )}
                  </button>
                ))}
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
