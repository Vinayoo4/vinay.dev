<script setup lang="ts">
import { onMounted, ref } from 'vue'
import anime from 'animejs'
import { Plus, Minus, Code2, Brain, TrendingUp, Smartphone, Shield, Zap, Check, Clock } from 'lucide-vue-next'

const services = [
  {
    id: 1,
    icon: Brain,
    title: 'AI & Machine Learning',
    tag: '01',
    desc: 'Custom intelligence models, NLP pipelines, and automation workflows tailored to your specific business logic. From data strategy to deployed inference endpoints.',
    deliverables: ['Custom ML Models', 'Data Pipelines', 'AI Automation', 'Model Deployment'],
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'Pandas', 'Scikit-learn', 'OpenAI API', 'LangChain'],
    benefits: [
      'Automate repetitive tasks to reduce operational costs by up to 60%.',
      'Make data-backed decisions with custom dashboards and predictive models.',
      'Deploy chatbots and document processors that work 24/7 without breaks.'
    ],
    engagementInfo: '4\u201310 weeks \u00b7 Fixed scope or retainer \u00b7 Starting \u20B925,000'
  },
  {
    id: 2,
    icon: Code2,
    title: 'Web Architecture & Dev',
    tag: '02',
    desc: 'Scalable, performant, and secure full-stack applications. We architect PWAs, SPAs, and headless systems built on modern, maintainable infrastructure.',
    deliverables: ['PWA / SPA Build', 'API Design', 'Performance Audit', 'Cloud Deploy'],
    techStack: ['Vue 3', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Vercel', 'Docker'],
    benefits: [
      'Deliver a fast, reliable web experience that converts visitors into customers.',
      'Scale effortlessly from hundreds to millions of users without rewrites.',
      'Reduce maintenance overhead with clean, well-documented architecture.'
    ],
    engagementInfo: '3\u20138 weeks \u00b7 Fixed scope \u00b7 Starting \u20B920,000'
  },
  {
    id: 3,
    icon: Smartphone,
    title: 'SaaS MVP Development',
    tag: '03',
    desc: 'From zero to a working, testable SaaS product in weeks. We handle architecture, UI/UX, auth, payments, and launch \u2014 so you can validate without waste.',
    deliverables: ['MVP Build', 'Auth & Billing', 'Admin Dashboard', 'Launch Support'],
    techStack: ['Vue 3', 'React', 'Node.js', 'Supabase', 'Stripe', 'AWS', 'Docker', 'PostgreSQL'],
    benefits: [
      'Validate your idea with real users before burning cash on full-scale engineering.',
      'Go from concept to launch in weeks with a battle-tested development framework.',
      'Iterate faster with built-in analytics, feedback loops, and automated deploys.'
    ],
    engagementInfo: '6\u201312 weeks \u00b7 Fixed scope \u00b7 Starting \u20B950,000'
  },
  {
    id: 4,
    icon: TrendingUp,
    title: 'Digital Growth Strategy',
    tag: '04',
    desc: 'Data-driven growth strategies and digital presence optimization. SEO, content systems, conversion-focused design, and analytics instrumentation.',
    deliverables: ['SEO Architecture', 'Analytics Setup', 'Content Systems', 'Conversion Audit'],
    techStack: ['Google Analytics 4', 'Google Search Console', 'SEMrush', 'Hotjar', 'Meta Ads', 'HubSpot', 'Segment'],
    benefits: [
      'Know exactly where your traffic comes from and what drives conversions.',
      'Rank higher on search with a technical SEO audit and content roadmap.',
      'Lower customer acquisition costs through targeted, data-driven campaigns.'
    ],
    engagementInfo: '2\u20136 weeks \u00b7 Retainer or project \u00b7 Starting \u20B915,000'
  },
  {
    id: 5,
    icon: Shield,
    title: 'Security & Code Review',
    tag: '05',
    desc: 'Identify vulnerabilities before they become incidents. We audit code, review auth flows, check third-party dependencies, and harden your deployment pipeline.',
    deliverables: ['Code Audit', 'Auth Review', 'Dependency Check', 'Security Report'],
    techStack: ['OWASP ZAP', 'SonarQube', 'Snyk', 'Burp Suite', 'ESLint', 'Docker Bench', 'TruffleHog'],
    benefits: [
      'Catch vulnerabilities early before they become costly data breaches.',
      'Build customer trust with a security-first approach to your product.',
      'Meet compliance requirements for data protection and privacy regulations.'
    ],
    engagementInfo: '1\u20133 weeks \u00b7 Fixed scope \u00b7 Starting \u20B918,000'
  },
  {
    id: 6,
    icon: Zap,
    title: 'Automation & Integration',
    tag: '06',
    desc: 'Connect your tools and eliminate manual work. We build Zapier-style workflows, API integrations, webhook systems, and backend automation scripts.',
    deliverables: ['API Integration', 'Workflow Automation', 'Webhook Systems', 'Cron Jobs'],
    techStack: ['Python', 'n8n', 'Make', 'Zapier', 'Node.js', 'PostgreSQL', 'Redis', 'AWS Lambda'],
    benefits: [
      'Eliminate hours of manual data entry by connecting your existing tools.',
      'Reduce human error in critical workflows with automated validation checks.',
      'Get real-time alerts and reports without logging into multiple dashboards.'
    ],
    engagementInfo: '1\u20134 weeks \u00b7 Fixed scope \u00b7 Starting \u20B912,000'
  }
]

const activeService = ref<number | null>(null)
const toggleService = (id: number) => {
  activeService.value = activeService.value === id ? null : id
}

onMounted(() => {
  anime({
    targets: '.studio-element',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: anime.stagger(100)
  })
})
</script>

<template>
  <div class="px-6 py-12 md:py-32 max-w-7xl mx-auto min-h-screen">
    <div class="max-w-4xl mb-24 pt-4">
      <div class="studio-element opacity-0 text-xs font-mono uppercase tracking-widest text-tech mb-8 flex items-center gap-3">
        <span class="inline-block w-8 h-px bg-tech"></span>
        Studio & Agency
      </div>
      <h1 class="studio-element opacity-0 text-5xl md:text-8xl mb-8 font-serif leading-[0.9] tracking-tight">
        Engineering<br/>the future.
      </h1>
      <p class="studio-element opacity-0 text-xl md:text-2xl text-neutral-500 font-light leading-relaxed max-w-2xl">
        We specialize in building robust software solutions and deploying intelligent systems. Logic-first, precision without the fluff.
      </p>
    </div>

    <div class="studio-element opacity-0 mb-20 max-w-4xl">
      <h2 class="text-3xl md:text-5xl font-serif mb-6">Approach</h2>
      <p class="text-lg md:text-xl text-neutral-600 font-light leading-relaxed">
        We are a problem-first, logic-led venture studio. We start by identifying real business pain points, rapidly validate hypotheses, and architect scalable solutions. Our process transforms validated concepts into production-grade systems engineered for growth, security, and performance.
      </p>
    </div>

    <div class="border-t border-neutral-200">
      <div
        v-for="service in services"
        :key="service.id"
        class="studio-element opacity-0 border-b border-neutral-200 cursor-pointer group"
        @click="toggleService(service.id)"
      >
        <div class="py-8 flex justify-between items-center gap-6">
          <div class="flex items-center gap-6">
            <span class="text-xs font-mono text-neutral-400 w-8 shrink-0">{{ service.tag }}</span>
            <component :is="service.icon" class="w-5 h-5 text-neutral-400 group-hover:text-tech transition-colors shrink-0" />
            <h3
              class="text-2xl md:text-4xl font-serif transition-colors group-hover:text-tech"
              :class="{ 'text-tech': activeService === service.id }"
            >
              {{ service.title }}
            </h3>
          </div>
          <button class="text-neutral-400 group-hover:text-tech transition-colors shrink-0">
            <Minus v-if="activeService === service.id" class="w-6 h-6" />
            <Plus v-else class="w-6 h-6" />
          </button>
        </div>

        <Transition name="accordion">
          <div v-show="activeService === service.id" class="pb-10 pl-14">
            <p class="text-neutral-600 max-w-2xl text-lg leading-relaxed mb-8">{{ service.desc }}</p>

            <div class="flex flex-wrap gap-3 mb-8">
              <span
                v-for="item in service.deliverables"
                :key="item"
                class="text-xs font-mono uppercase tracking-widest border border-tech/30 text-tech px-3 py-1.5"
              >
                {{ item }}
              </span>
            </div>

            <hr class="border-neutral-200 mb-6" />

            <div class="mb-6">
              <h4 class="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">Tech Stack</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in service.techStack"
                  :key="tech"
                  class="font-mono bg-neutral-100 px-2 py-1 text-xs text-neutral-700 border border-neutral-200"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="mb-6">
              <h4 class="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">Key Benefits</h4>
              <ul class="space-y-2">
                <li
                  v-for="(benefit, i) in service.benefits"
                  :key="i"
                  class="flex items-start gap-2 text-sm text-neutral-600"
                >
                  <Check class="w-4 h-4 text-tech mt-0.5 shrink-0" />
                  <span>{{ benefit }}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Engagement</h4>
              <div class="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <Clock class="w-3.5 h-3.5" />
                <span>{{ service.engagementInfo }}</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="studio-element opacity-0 mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-10 md:p-14 border border-neutral-200">
      <div>
        <h3 class="font-serif text-3xl md:text-5xl mb-3">Have a project in mind?</h3>
        <p class="text-neutral-500">Let us build it the right way from day one.</p>
      </div>
      <router-link
        to="/contact"
        class="shrink-0 bg-neutral-900 text-white px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-tech transition-colors duration-300"
      >
        Start a Conversation
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.accordion-enter-active, .accordion-leave-active {
  transition: all 0.35s ease;
  overflow: hidden;
}
.accordion-enter-from, .accordion-leave-to {
  opacity: 0;
  max-height: 0;
  padding-bottom: 0;
}
.accordion-enter-to, .accordion-leave-from {
  opacity: 1;
  max-height: 1200px;
}
</style>
