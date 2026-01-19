
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  IconArrowRight as ArrowRight,
  IconPlayerPlay as Play,
  IconRefresh as RotateCcw,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/aura/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/aura/card';

const principles = [
  {
    title: 'Purpose',
    description:
      'Every animation should have a clear purpose and enhance the user experience',
    icon: '',
  },
  {
    title: 'Personality',
    description:
      'Motion should reflect the brand personality while maintaining professionalism',
    icon: '',
  },
  {
    title: 'Performance',
    description:
      'Animations should be smooth, lightweight, and respect user preferences',
    icon: '',
  },
];

const easings = [
  {
    name: 'Linear',
    value: [0, 0, 1, 1] as const,
    description: 'Constant speed throughout',
  },
  {
    name: 'Ease out',
    value: [0, 0, 0.2, 1] as const,
    description: 'Fast start, slow finish',
  },
  {
    name: 'Ease in',
    value: [0.4, 0, 1, 1] as const,
    description: 'Slow start, fast finish',
  },
  {
    name: 'Ease in out',
    value: [0.4, 0, 0.2, 1] as const,
    description: 'Slow start and finish',
  },
];

function AnimationDemo({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [key, setKey] = useState(0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setKey((prev) => prev + 1)}
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Replay
        </Button>
      </CardHeader>
      <CardContent>
        <div
          key={key}
          className="flex items-center justify-center h-24 bg-muted/30 rounded-lg"
        >
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MotionPage() {
  const [selectedEasing, setSelectedEasing] = useState(0);
  const [showStagger, setShowStagger] = useState(false);

  return (
    <div className="px-3 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16 text-center"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Motion guidelines
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Thoughtful motion design creates delightful experiences that guide
              users and provide feedback while maintaining performance and
              accessibility.
            </p>
          </div>

          {/* Motion Principles */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Motion principles</h2>
              <p className="text-muted-foreground">
                Core guidelines that inform all motion decisions in our design
                system
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <CardHeader>
                      <CardTitle>{principle.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {principle.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Animation Demos */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Interactive demonstrations</h2>
              <p className="text-muted-foreground">
                Live examples of motion patterns and their implementations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Fade In */}
              <AnimationDemo title="Fade in">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-primary rounded-lg"
                />
              </AnimationDemo>

              {/* Slide Up */}
              <AnimationDemo title="Slide up">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
                  className="w-16 h-16 bg-primary rounded-lg"
                />
              </AnimationDemo>

              {/* Scale */}
              <AnimationDemo title="Scale">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
                  className="w-16 h-16 bg-primary rounded-lg"
                />
              </AnimationDemo>

              {/* Bounce */}
              <AnimationDemo title="Bounce">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0, 0, 0.2, 1],
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="w-16 h-16 bg-primary rounded-lg"
                />
              </AnimationDemo>

              {/* Rotate */}
              <AnimationDemo title="Rotate">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, ease: 'linear' }}
                  className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center"
                >
                  <ArrowRight className="h-6 w-6 text-primary-foreground" />
                </motion.div>
              </AnimationDemo>

              {/* Loading Dots */}
              <AnimationDemo title="Loading animation">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: index * 0.2,
                      }}
                      className="w-3 h-3 bg-primary rounded-full"
                    />
                  ))}
                </div>
              </AnimationDemo>
            </div>
          </section>

          {/* Easing Functions */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Easing functions</h2>
              <p className="text-muted-foreground">
                Different timing functions create different motion personalities
              </p>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Easing comparison</CardTitle>
                  <CardDescription>
                    Click on different easing functions to see how they affect
                    motion
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {easings.map((easing, index) => (
                      <Button
                        key={easing.name}
                        variant={
                          selectedEasing === index ? 'default' : 'outline'
                        }
                        onClick={() => setSelectedEasing(index)}
                      >
                        {easing.name}
                      </Button>
                    ))}
                  </div>

                  <div className="h-24 bg-muted/30 rounded-lg flex items-center justify-center">
                    <motion.div
                      key={selectedEasing}
                      initial={{ x: -100 }}
                      animate={{ x: 100 }}
                      transition={{
                        duration: 1,
                        ease: easings[selectedEasing].value,
                      }}
                      className="w-8 h-8 bg-primary rounded-lg"
                    />
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    {easings[selectedEasing].description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Stagger Animation */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Stagger animations</h2>
              <p className="text-muted-foreground">
                Sequential animations create rhythm and draw attention
              </p>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>List animation</CardTitle>
                  <CardDescription>Items animate in sequence</CardDescription>
                </div>
                <Button onClick={() => setShowStagger(!showStagger)}>
                  <Play className="h-4 w-4 mr-2" />
                  Trigger animation
                </Button>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  {showStagger && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                      className="space-y-3"
                    >
                      {[1, 2, 3, 4, 5].map((item) => (
                        <motion.div
                          key={item}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                          className="p-4 bg-muted rounded-lg flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <div>Item {item}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </section>

          {/* Implementation Guidelines */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Implementation guidelines</h2>
              <p className="text-muted-foreground">
                Best practices for implementing motion in your applications
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Duration guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Micro-interactions</span>
                      <span className="text-sm font-mono">100-200ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Element transitions</span>
                      <span className="text-sm font-mono">200-500ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Page transitions</span>
                      <span className="text-sm font-mono">300-600ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Complex animations</span>
                      <span className="text-sm font-mono">500ms-1s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accessibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Respect prefers-reduced-motion</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Provide pause/stop controls for long animations
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Avoid animations that flash more than 3 times per second
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Ensure animations don&apos;t interfere with content
                        reading
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
