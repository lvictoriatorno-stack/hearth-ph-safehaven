import { Card } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { BookOpen, Heart, Shield, Sparkles } from "lucide-react";

const categories = [
  {
    title: "Understanding HIV",
    icon: BookOpen,
    color: "text-blue-500",
    articles: [
      { title: "Living Well with HIV", readTime: "5 min" },
      { title: "Treatment Basics", readTime: "7 min" },
      { title: "Viral Load Explained", readTime: "4 min" },
    ],
  },
  {
    title: "Mental Wellness",
    icon: Heart,
    color: "text-primary",
    articles: [
      { title: "Self-Compassion Guide", readTime: "6 min" },
      { title: "Managing Anxiety", readTime: "5 min" },
      { title: "Building Resilience", readTime: "8 min" },
    ],
  },
  {
    title: "Stigma & Rights",
    icon: Shield,
    color: "text-purple-500",
    articles: [
      { title: "Know Your Rights (RA 11166)", readTime: "10 min" },
      { title: "Dealing with Stigma", readTime: "7 min" },
      { title: "Disclosure Decisions", readTime: "9 min" },
    ],
  },
  {
    title: "Sexual Health",
    icon: Sparkles,
    color: "text-pink-500",
    articles: [
      { title: "Healthy Relationships", readTime: "6 min" },
      { title: "Prevention Methods", readTime: "5 min" },
      { title: "Talking to Partners", readTime: "7 min" },
    ],
  },
];

export default function Learn() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Education Hub</h1>
          <p className="text-sm text-muted-foreground">Knowledge empowers healing</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.title} className="fade-in-up">
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`h-6 w-6 ${category.color}`} />
                <h2 className="text-lg font-semibold">{category.title}</h2>
              </div>
              <div className="space-y-2">
                {category.articles.map((article, idx) => (
                  <Card
                    key={idx}
                    className="p-4 hover:shadow-lg transition-all cursor-pointer hover:scale-102"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{article.title}</span>
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* Compliance Note */}
        <Card className="p-4 bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">
            All content follows DOH and RA 11166 guidelines. Information reviewed by healthcare professionals.
          </p>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
