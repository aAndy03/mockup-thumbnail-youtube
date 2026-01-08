import './index.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CategoryPills } from './components/CategoryPills';
import { VideoCard } from './components/VideoCard';
import { VideoCardList } from './components/VideoCardList';
import { MockVideoCard } from './components/MockVideoCard';
import { MockVideoCardList } from './components/MockVideoCardList';
import { WatchPage } from './components/WatchPage';
import { HistoryControls } from './components/HistoryControls';
import { IntroModal } from './components/IntroModal';
import { videos } from './data/videos';
import { useAppStore } from './stores/useAppStore';

// Animation variants for view transitions
const viewVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

function App() {
  const { viewMode, hasSeenIntro, setHasSeenIntro } = useAppStore();

  // For grid view: mock card is always second (after first video)
  const firstVideo = videos.slice(0, 1);
  const remainingVideos = videos.slice(1);

  return (
    <div className="min-h-screen bg-yt-dark">
      {/* Introduction Modal */}
      <AnimatePresence>
        {!hasSeenIntro && (
          <IntroModal onClose={() => setHasSeenIntro(true)} />
        )}
      </AnimatePresence>

      <Header />
      <Sidebar />

      {/* Main content area */}
      <main className="ml-60 pt-14">
        <AnimatePresence mode="wait">
          {viewMode !== 'player' && (
            <motion.div
              key="pills"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CategoryPills />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video grid, list, or player */}
        <div className="px-6 pb-20">
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              // Grid View (Home page style) - mock card always second
              <motion.div
                key="grid"
                variants={viewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10"
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                >
                  {firstVideo.map((video) => (
                    <motion.div key={video.id} variants={itemVariants}>
                      <VideoCard video={video} />
                    </motion.div>
                  ))}
                  <motion.div variants={itemVariants}>
                    <MockVideoCard />
                  </motion.div>
                  {remainingVideos.map((video) => (
                    <motion.div key={video.id} variants={itemVariants}>
                      <VideoCard video={video} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : viewMode === 'list' ? (
              // List View (Search results style) - fewer, larger cards
              <motion.div
                key="list"
                variants={viewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="max-w-5xl mx-auto flex flex-col gap-6"
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                >
                  {firstVideo.map((video) => (
                    <motion.div key={video.id} variants={itemVariants}>
                      <VideoCardList video={video} />
                    </motion.div>
                  ))}
                  <motion.div variants={itemVariants}>
                    <MockVideoCardList />
                  </motion.div>
                  {remainingVideos.slice(0, 1).map((video) => (
                    <motion.div key={video.id} variants={itemVariants}>
                      <VideoCardList video={video} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              // Player View (Watch page style)
              <motion.div
                key="player"
                variants={viewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <WatchPage />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating history controls */}
      <HistoryControls />
    </div>
  );
}

export default App;
