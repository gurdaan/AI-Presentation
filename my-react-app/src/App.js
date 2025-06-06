import React, { useState, useEffect } from 'react';
import {
  Lightbulb, MessageSquare, Brain, User, Settings, AlignJustify, TrendingUp, RefreshCcw, GitFork, BookOpen, SlidersHorizontal,
  XCircle, MessageCircle, Search, Code, Image, Bot, Home, Monitor, Briefcase, Megaphone, Cloud, FlaskConical, LaptopMinimal, Newspaper // New icon for news
} from 'lucide-react';

// --- Prompting Techniques Data ---
const techniques = [
  {
    name: "Zero-Shot Prompting",
    description: "Asking the AI to perform a task without any examples.",
    icon: Lightbulb,
    category: "Foundational & Example-Based",
    teamApplications: [
      {
        team: "Sales Team",
        useCase: "Quickly generate initial draft emails or brief product descriptions without needing prior examples, e.g., 'Write a short email highlighting why construction companies need advanced software systems.'"
      },
      {
        team: "Marketing Team",
        useCase: "Brainstorm campaign taglines or social media post ideas on the fly, e.g., 'Suggest 5 catchy slogans for a sustainable fashion brand.'"
      },
      {
        team: "Cloud & Infrastructure Team",
        useCase: "Generate basic shell commands or simple configuration snippets for a new service, e.g., 'Give me a command to list all running Docker containers.'"
      },
      {
        team: "QA Team",
        useCase: "Generate a quick list of basic test cases for a new login screen, e.g., 'List 3 common test cases for a user login form.'"
      },
      {
        team: "Development Team",
        useCase: "Generate a simple utility function or a basic code structure, e.g., 'Write a Python function to reverse a string.'"
      }
    ]
  },
  {
    name: "Few-Shot Prompting",
    description: "Providing a few examples to guide the AI's understanding and output style.",
    icon: MessageSquare,
    category: "Foundational & Example-Based",
    teamApplications: [
      {
        team: "Sales Team",
        useCase: "Craft personalized sales pitches by providing examples of successful past pitches, e.g., 'Here are 3 examples of sales pitches that worked for us. Generate one for a new client focusing on cost savings.'"
      },
      {
        team: "Marketing Team",
        useCase: "Maintain brand voice consistency by showing examples of previous social media posts or ad copy, e.g., 'Based on these 2 ad copies, write a new one for our summer collection.'"
      },
      {
        team: "Cloud & Infrastructure Team",
        useCase: "Generate specific configuration files (e.g., Kubernetes YAML) by providing a few existing examples to follow the pattern, e.g., 'Given these two service definitions, create a third for a new microservice.'"
      },
      {
        team: "QA Team",
        useCase: "Generate test cases for specific scenarios by showing examples of similar test cases, e.g., 'Here are examples of edge case test data for email validation. Generate 5 more similar ones.'"
      },
      {
        team: "Development Team",
        useCase: "Generate code that adheres to specific coding standards or patterns by providing examples of existing code, e.g., 'Given these two React components, write a new one following the same structure and styling.'"
      }
    ]
  },
  {
    name: "Chain-of-Thought (CoT) Prompting",
    description: "Instructing the AI to show its reasoning steps before the final answer.",
    icon: Brain,
    category: "Reasoning & Guidance",
    teamApplications: [
      {
        team: "Sales Team",
        useCase: "Analyze complex client objections by asking the AI to break down the reasoning behind the objection and suggest counter-arguments, e.g., 'A client said X. Walk me through their likely concerns and how to address each.'"
      },
      {
        team: "Marketing Team",
        useCase: "Develop a multi-step content strategy by asking the AI to outline the thought process for reaching a target audience, e.g., 'Outline a content strategy for launching a new product, showing your reasoning for each step.'"
      },
      {
        team: "Cloud & Infrastructure Team",
        useCase: "Troubleshoot complex system errors by asking the AI to logically deduce potential causes based on logs and symptoms, e.g., 'Given these error logs, explain step-by-step how you would diagnose the root cause.'"
      },
      {
        team: "QA Team",
        useCase: "Perform root cause analysis for bugs by asking the AI to trace the logical flow that might lead to a defect, e.g., 'Explain the steps a user would take to encounter this bug, and what might be happening at each stage.'"
      },
      {
        team: "Development Team",
        useCase: "Debug intricate code issues or design complex algorithms by asking the AI to explain its thought process, e.g., 'Explain your reasoning for choosing this data structure for the given problem, considering time and space complexity.'"
      }
    ]
  },
  {
    name: "Persona-Based Prompting",
    description: "Assigning a specific persona to the AI (e.g., 'Act as a marketing expert').",
    icon: User,
    category: "Context & Identity",
    teamApplications: [
      {
        team: "Sales Team",
        useCase: "Generate emails or scripts as a 'seasoned sales veteran' to adopt a confident and persuasive tone, e.g., 'Act as a top-performing sales rep and draft an email to a hesitant prospect.'"
      },
      {
        team: "Marketing Team",
        useCase: "Create content from the perspective of a 'brand's target audience' or a 'specific industry expert' to ensure relevance and authenticity, e.g., 'As a Gen Z fashion influencer, write a TikTok script for our new clothing line.'"
      },
      {
        team: "Cloud & Infrastructure Team",
        useCase: "Get advice from the perspective of a 'senior DevOps engineer' for architectural decisions or troubleshooting, e.g., 'Act as a highly experienced cloud architect and review this proposed serverless design.'"
      },
      {
        team: "QA Team",
        useCase: "Simulate user behavior by adopting a 'novice user' or 'power user' persona to test different interaction paths, e.g., 'Act as a user who is easily confused by complex interfaces and try to complete this checkout process.'"
      },
      {
        team: "Development Team",
        useCase: "Receive code reviews or architectural suggestions from the perspective of a 'security expert' or 'performance engineer', e.g., 'Act as a cybersecurity expert and identify potential vulnerabilities in this authentication code.'"
      }
    ]
  },
  {
    name: "Role-Playing Prompting",
    description: "Asking the AI to simulate a conversation or scenario from a specific role.",
    icon: SlidersHorizontal,
    category: "Context & Identity",
    teamApplications: [
      {
        team: "Sales Team",
        useCase: "Practice sales calls by having the AI play the role of a challenging prospect, e.g., 'You are a skeptical CFO. I will try to sell you our software. Respond to my pitch.'"
      },
      {
        team: "Marketing Team",
        useCase: "Simulate customer service interactions or public relations crisis responses, e.g., 'You are an angry customer on Twitter. I am the brand's social media manager. Respond to my apology.'"
      },
      {
        team: "Cloud & Infrastructure Team",
        useCase: "Simulate incident response scenarios or team discussions about a new deployment, e.g., 'You are a critical production server that just crashed. Provide me with the error messages and logs as I try to debug you.'"
      },
      {
        team: "QA Team",
        useCase: "Simulate user flows or interactions with a system to identify usability issues or unexpected behaviors, e.g., 'You are a user trying to book a flight with specific constraints. Guide me through your steps and tell me if you encounter issues.'"
      },
      {
        team: "Development Team",
        useCase: "Simulate API interactions or test different user inputs for a function, e.g., 'You are a REST API endpoint. I will send you JSON requests, and you respond with appropriate JSON responses, including error codes.'"
      }
    ]
  },
  {
    name: "Constraint-Based Prompting",
    description: "Setting explicit rules or limitations on the AI's output (e.g., 'Max 100 words', 'Use only positive language').",
    icon: Settings,
    category: "Context & Identity",
    teamApplications: [
      {
        team: "Sales Team",
        useCase: "Ensure sales communications are concise and adhere to compliance guidelines, e.g., 'Write a follow-up email, max 50 words, no jargon, and focus on benefits.'"
      },
      {
        team: "Marketing Team",
        useCase: "Control content length for specific platforms (e.g., Twitter character limits) or enforce brand messaging rules, e.g., 'Generate 3 social media posts for Instagram, each under 200 characters, using only positive language.'"
      },
      {
        team: "Cloud & Infrastructure Team",
        useCase: "Generate configuration files with specific parameters or security policies, e.g., 'Create a firewall rule that only allows traffic on port 80 and 443 from IP range 192.168.1.0/24.'"
      },
      {
        team: "QA Team",
        useCase: "Generate test data that meets specific criteria or constraints (e.g., valid email formats, age ranges), e.g., 'Generate 10 valid email addresses and 5 invalid ones, all under 20 characters.'"
      },
      {
        team: "Development Team",
        useCase: "Generate code that adheres to strict style guides, complexity limits, or security best practices, e.g., 'Write a JavaScript function that performs X, ensuring it has no more than 10 lines of code and avoids global variables.'"
      }
    ]
  },
  {
    name: "Delimiters",
    description: "Using clear separators (e.g., ```, ###) to structure different parts of a prompt.",
    icon: AlignJustify,
    category: "Formatting & Structure",
    teamApplications: [
      {
        team: "Sales Team",
        useCase: "Clearly separate client background from the desired email draft in a single prompt, e.g., 'Client background: [details]. Email draft: [desired tone/content].'"
      },
      {
        team: "Marketing Team",
        useCase: "Distinguish between content brief, target audience, and desired output format in a complex prompt, e.g., 'Brief: [details] ### Audience: [details] ### Output: [format].'"
      },
      {
        team: "Cloud & Infrastructure Team",
        useCase: "Separate different sections of a complex infrastructure request (e.g., server specs, network config, security rules), e.g., 'Server: [specs] --- Network: [config] --- Security: [rules].'"
      },
      {
        team: "QA Team",
        useCase: "Clearly define test setup, test steps, and expected results within a prompt for generating test cases, e.g., 'Setup: [preconditions] ### Steps: [actions] ### Expected: [outcome].'"
      },
      {
        team: "Development Team",
        useCase: "Separate code snippets from instructions or context in a prompt for code generation or debugging, e.g., 'Context: [description] ```python [code] ``` Instructions: [task].'"
      }
    ]
  },
  {
    name: "Output Formats",
    description: "Specifying the desired output structure (e.g., JSON, bullet points, table).",
    icon: BookOpen,
    category: "Formatting & Structure",
    teamApplications: [
      {
        team: "Sales Team",
        useCase: "Receive lead qualification data in a structured table or a summary in bullet points, e.g., 'Summarize key client needs in bullet points.'"
      },
      {
        team: "Marketing Team",
        useCase: "Generate content calendars in a table format or social media post ideas as a JSON array for easy integration, e.g., 'Provide 5 blog post ideas as a JSON array with 'title' and 'keywords' fields.'"
      },
      {
        team: "Cloud & Infrastructure Team",
        useCase: "Request configuration details or resource lists in YAML or JSON format for direct use in automation scripts, e.g., 'List all EC2 instances in us-east-1 as a JSON array with 'InstanceId' and 'State' fields.'"
      },
      {
        team: "QA Team",
        useCase: "Generate test reports in a markdown table or test data as a CSV string, e.g., 'Generate 10 test user profiles in CSV format: name,email,password.'"
      },
      {
        team: "Development Team",
        useCase: "Receive API response mockups in JSON, code snippets in a specific language block, or documentation in Markdown, e.g., 'Generate a mock JSON response for a user profile API.'"
      }
    ]
  },
  {
    name: "Instruction Tuning / Finetuning",
    description: "Training a model on specific datasets to follow instructions better (briefly).",
    icon: TrendingUp,
    category: "Advanced & Beyond Prompting",
    teamApplications: [
      {
        team: "Sales Team",
        useCase: "Finetune a model on a dataset of successful sales conversations to improve its ability to generate persuasive language and handle objections specific to your products."
      },
      {
        team: "Marketing Team",
        useCase: "Train a model on your brand's extensive content library to ensure all generated marketing copy perfectly matches your unique brand voice and style guidelines."
      },
      {
        team: "Cloud & Infrastructure Team",
        useCase: "Finetune a model on internal knowledge bases and incident reports to create an AI assistant highly specialized in troubleshooting your specific infrastructure issues."
      },
      {
        team: "QA Team",
        useCase: "Train a model on your historical bug reports and test case documentation to enable it to generate more relevant and comprehensive test scenarios and identify common failure patterns."
      },
      {
        team: "Development Team",
        useCase: "Finetune a code generation model on your company's proprietary codebase to ensure it generates code that adheres to internal standards, uses specific libraries, and understands project context."
      }
    ]
  },
  {
    name: "Self-Correction / Self-Refinement",
    description: "Prompting the AI to review and improve its own previous output.",
    icon: RefreshCcw,
    category: "Reasoning & Guidance",
    teamApplications: [
      {
        team: "Sales Team",
        useCase: "Ask the AI to review a generated sales email for clarity, conciseness, and persuasiveness, then refine it based on specific criteria, e.g., 'Review this email. Make it more concise and add a stronger call to action.'"
      },
      {
        team: "Marketing Team",
        useCase: "Have the AI revise a blog post for SEO optimization or tone, e.g., 'Review this blog post for readability and suggest improvements for better engagement.'"
      },
      {
        team: "Cloud & Infrastructure Team",
        useCase: "Prompt the AI to review a generated script for potential errors or inefficiencies, then suggest optimizations, e.g., 'Review this deployment script for security best practices and suggest any improvements.'"
      },
      {
        team: "QA Team",
        useCase: "Ask the AI to review a generated test case for completeness or logical flaws, then refine it, e.g., 'Review this test case. Are there any missing steps or edge cases not covered?'"
      },
      {
        team: "Development Team",
        useCase: "Instruct the AI to refactor its own generated code for better performance, readability, or adherence to design patterns, e.g., 'Refactor the previous code snippet to be more idiomatic Python and add error handling.'"
      }
    ]
  },
  {
    name: "Tree-of-Thought / Graph-of-Thought",
    description: "Advanced methods for complex problem-solving, exploring multiple reasoning paths.",
    icon: GitFork,
    category: "Reasoning & Guidance",
    teamApplications: [
      {
        team: "Sales Team",
        useCase: "Strategize for complex enterprise sales by exploring multiple angles for addressing client needs and competitive threats, e.g., 'Develop a strategy to win the 'BigCorp' deal. Consider product fit, competitor weaknesses, and client internal politics, exploring several approaches.'"
      },
      {
        team: "Marketing Team",
        useCase: "Design comprehensive multi-channel marketing campaigns by evaluating various creative directions and audience segments, e.g., 'Brainstorm 3 distinct marketing campaign concepts for our new product, detailing the rationale and target channels for each path.'"
      },
      {
        team: "Cloud & Infrastructure Team",
        useCase: "Plan disaster recovery strategies or complex migration paths by considering various failure modes and architectural choices, e.g., 'Outline multiple disaster recovery strategies for our critical microservices, detailing pros and cons for each approach (e.g., active-passive, active-active, multi-region).'"
      },
      {
        team: "QA Team",
        useCase: "Develop comprehensive test plans for large-scale system integrations by considering various data flows, dependencies, and potential failure points across different modules, e.g., 'Design a full end-to-end test plan for our new payment gateway integration, considering different success and failure paths, and external system dependencies.'"
      },
      {
        team: "Development Team",
        useCase: "Architect complex software systems by exploring multiple design patterns, data models, and technology stacks, evaluating trade-offs for each, e.g., 'Propose three distinct architectural patterns for a scalable real-time analytics platform, detailing the advantages and disadvantages of each (e.g., Lambda, Kappa, Streaming-first).'"
      }
    ]
  }
];

// --- AI Models Data ---
const models = [
  {
    name: "Conversational AI / Basic LLMs",
    description: "General-purpose models for text generation, Q&A, and basic conversation.",
    icon: MessageCircle,
    category: "Simple / General Purpose",
    examples: "ChatGPT (basic), Gemini (basic), Claude (basic)",
  },
  {
    name: "Reasoning & Problem-Solving LLMs",
    description: (
      <span>
        Models capable of multi-step reasoning, complex problem-solving, and logical deduction (often via techniques like CoT).
      </span>
    ),
    icon: Brain,
    category: "Intermediate / Reasoning",
    examples: "o1, o1-mini, o3-mini, o3 From OpenAI, Gemini Ultra, Gemini Pro, Gemini Flash, Claude 3, Google's 'Project Astra' (future-looking)",
  },
  {
    name: "Deep Research & Synthesis Models",
    description: (
      <span>
        AI designed to ingest vast amounts of information, cross-reference, and synthesize findings.
        See{" "}
        <a href="[https://openai.com/index/introducing-deep-research/](https://openai.com/index/introducing-deep-research/)" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          OpenAI's Deep Research
        </a>{" "}for more.
      </span>
    ),
    icon: Search,
    category: "Intermediate / Data-Driven",
    examples: "Perplexity AI, Elicit, Internal Knowledge Graph AIs, 'Deep Research' systems",
  },
  {
    name: "Code Generation & Assistance Models",
    description: "Specialized models for generating, completing, debugging, and explaining code across languages.",
    icon: Code,
    category: "Specialized / Development",
    examples: "GitHub Copilot, AWS CodeWhisperer, Google Gemini for Developers, 'Codex'",
  },
  {
    name: "AI-Powered Collaborative Environments",
    description: "Integrated platforms that combine AI models with interactive coding, real-time assistance, and collaborative features.",
    icon: Monitor,
    category: "Specialized / Development",
    examples: "Google Canvas (this environment), VS Code with AI extensions, Jupyter Notebooks with AI plugins",
  },
  {
    name: "Generative AI (Images / Creative)",
    description: "Models that create new images, illustrations, or visual assets from text prompts.",
    icon: Image,
    category: "Specialized / Creative",
    examples: "Midjourney, DALL-E, Stable Diffusion, Adobe Firefly",
  },
  {
    name: "Agentic AI & Autonomous Systems",
    description: "AI systems that can plan, execute multi-step tasks, interact with tools, and potentially self-correct to achieve a goal.",
    icon: Bot,
    category: "Complex / Agentic",
    examples: "AutoGPT, BabyAGI, LangChain-based agents, 'Jules for CLI-based agents'",
  }
];

// --- Department-Specific Tools Data ---
const departmentTools = [
  {
    department: "Sales Team",
    icon: Briefcase,
    tasks: [
      {
        name: "Lead Qualification & Research",
        tools: [
          { name: "CRM AI Integration", description: "Analyzes lead data to predict conversion likelihood and suggests next best actions.", examples: [{ name: "Salesforce Einstein", url: "https://www.salesforce.com/products/einstein/" }, { name: "HubSpot AI", url: "https://www.hubspot.com/products/crm/ai-crm" }] },
          { name: "AI Research Platforms", description: "Gathers comprehensive prospect information from various public and private sources.", examples: [{ name: "Apollo.io (with AI features)", url: "https://www.apollo.io/lp/demo-b" }, { name: "ZoomInfo (with AI insights)", url: "https://www.zoominfo.com/copilot" }] },
          { name: "Autonomous Data Agents", description: "Automates data gathering for prospects and competitive analysis.", examples: [{ name: "Custom LangChain agents", url: "https://www.langchain.com/" }, { name: "Zapier with AI integrations", url: "https://zapier.com/ai" }] }
        ]
      },
      {
        name: "Personalized Outreach & Communication",
        tools: [
          { name: "AI Writing Assistants", description: "Drafts personalized cold emails, follow-up messages, and meeting summaries.", examples: [{ name: "Lavender.ai", url: "https://www.lavender.ai/" }, { name: "Regie.ai", url: "https://www.regie.ai/" }, { name: "Jasper (for email templates)", url: "https://www.jasper.ai/" }] },
          { name: "AI-Powered Sales Coaching", description: "Provides real-time feedback on sales calls and communication style.", examples: [{ name: "Gong.io", url: "https://www.gong.io/" }, { name: "Chorus.ai", url: "https://www.chorus.ai/" }] },
          { name: "Generative Image Tools", description: "Creates quick, custom visuals for sales presentations or personalized marketing materials.", examples: [{ name: "Canva (with AI features)", url: "https://www.canva.com/ai-features/" }, { name: "Midjourney (for concepts)", url: "https://www.midjourney.com/" }] }
        ]
      }
    ]
  },
  {
    department: "Marketing Team",
    icon: Megaphone,
    tasks: [
      {
        name: "Content Creation & Ideation",
        tools: [
          { name: "AI Content Generators", description: "Brainstorms blog topics, generates headlines, and drafts social media captions.", examples: [{ name: "Jasper", url: "https://www.jasper.ai/" }, { name: "Copy.ai", url: "https://www.copy.ai/" }, { name: "Writesonic", url: "https://writesonic.com/" }] },
          { name: "AI Image/Video Generators", description: "Produces ad creatives, social media visuals, and concept art for campaigns.", examples: [{ name: "Midjourney", url: "https://www.midjourney.com/" }, { name: "DALL-E 3", url: "https://openai.com/dall-e-3" }, { name: "RunwayML (for video)", url: "https://runwayml.com/" }] },
          { name: "SEO AI Tools", description: "Identifies content gaps and optimizes content for search engines.", examples: [{ name: "Surfer SEO (with AI)", url: "https://surferseo.com/" }, { name: "Semrush (AI writing assistant)", url: "https://www.semrush.com/ai-writing-assistant/" }] }
        ]
      },
      {
        name: "Campaign Strategy & Analysis",
        tools: [
          { name: "AI Marketing Analytics", description: "Assists in developing multi-channel marketing strategies and identifying market trends.", examples: [{ name: "Google Analytics (with AI insights)", url: "https://analytics.google.com/" }, { name: "Adobe Sensei", url: "https://www.adobe.com/sensei.html" }] },
          { name: "Competitive Intelligence AI", description: "Performs extensive market research and competitive analysis.", examples: [{ name: "Similarweb (AI features)", url: "https://www.similarweb.com/" }, { name: "Brandwatch (AI insights)", url: "https://www.brandwatch.com/" }] },
          { name: "AI-Powered Social Media Management", description: "Automates monitoring of social media trends and competitor activities.", examples: [{ name: "Hootsuite (AI features)", url: "https://www.hootsuite.com/" }, { name: "Sprout Social (AI listening)", url: "https://sproutsocial.com/" }] }
        ]
      }
    ]
  },
  {
    department: "Cloud & Infrastructure Team",
    icon: Cloud,
    tasks: [
      {
        name: "Infrastructure Management & Automation",
        tools: [
          { name: "AI for IaC Generation", description: "Generates Infrastructure-as-Code (IaC) templates (Terraform, CloudFormation) and automation scripts.", examples: [{ name: "GitHub Copilot", url: "https://github.com/features/copilot" }, { name: "AWS CodeWhisperer", url: "https://aws.amazon.com/codewhisperer/" }] },
          { name: "Autonomous Cloud Agents", description: "Enables autonomous infrastructure management, self-healing systems, and automated deployments.", examples: [{ name: "Datadog Watchdog", url: "https://www.datadoghq.com/product/monitoring/watchdog/" }, { name: "Custom Kubernetes operators with AI", url: "https://kubernetes.io/docs/concepts/extend-kubernetes/operator/" }] },
          { name: "AI-Driven Cloud Optimization", description: "Predicts resource needs and optimizes cloud costs.", examples: [{ name: "CloudHealth (VMware)", url: "https://cloudhealth.vmware.com/" }, { name: "Apptio Cloudability", url: "https://www.apptio.com/products/cloudability/" }] }
        ]
      },
      {
        name: "Troubleshooting & Security Operations",
        tools: [
          { name: "AI Observability Platforms", description: "Provides advanced troubleshooting guides for complex cloud errors and suggests architectural optimizations.", examples: [{ name: "Dynatrace", url: "https://www.dynatrace.com/" }, { name: "New Relic", url: "https://newrelic.com/" }, { name: "Splunk (with AI)", url: "https://www.splunk.com/en_us/splunk-ai.html" }] },
          { name: "AI-Powered Log Analysis", description: "Researches obscure error codes across documentation and community forums, identifies anomalies.", examples: [{ name: "Sumo Logic (AI features)", url: "https://www.sumologic.com/" }, { name: "Elastic Stack (Machine Learning)", url: "https://www.elastic.co/what-is/elastic-stack-machine-learning" }] },
          { name: "AI Security Operations (SecOps)", description: "Automates threat detection, incident response, and vulnerability management.", examples: [{ name: "Microsoft Sentinel", url: "https://azure.microsoft.com/en-us/products/microsoft-sentinel" }, { name: "CrowdStrike Falcon", url: "https://www.crowdstrike.com/products/falcon-platform/" }] }
        ]
      }
    ]
  },
  {
    department: "QA Team",
    icon: FlaskConical,
    tasks: [
      {
        name: "Test Case & Data Generation",
        tools: [
          { name: "AI Test Case Generators", description: "Generates basic test scenarios and test cases for various functionalities.", examples: [{ name: "Testsigma (AI features)", url: "https://testsigma.com/" }, { name: "Tricentis Testim (AI-powered)", url: "https://www.tricentis.com/products/automate-continuous-testing/testim/" }] },
          { name: "AI Test Data Management", description: "Hels generate diverse edge cases and specific test data based on examples.", examples: [{ name: "GenRocket (AI-driven)", url: "https://genrocket.com/" }, { name: "Mostly AI", url: "https://mostly.ai/" }] },
          { name: "AI for Automated Scripting", description: "Assists in creating automated test scripts (e.g., Selenium, Playwright).", examples: [{ name: "Applitools (AI-powered visual testing)", url: "https://applitools.com/" }, { name: "Cypress (with AI plugins)", url: "https://www.cypress.io/" }] }
        ]
      },
      {
        name: "Bug Analysis & Predictive QA",
        tools: [
          { name: "AI Bug Prioritization", description: "Analyzes bug reports and historical data to prioritize critical issues.", examples: [{ name: "Jira (with AI plugins)", url: "https://www.atlassian.com/software/jira" }, { name: "Linear (AI features)", url: "https://linear.app/" }] },
          { name: "Autonomous Testing Agents", description: "Enables autonomous bug reporting (finding, documenting) and end-to-end testing.", examples: [{ name: "Mabl", url: "https://www.mabl.com/" }, { name: "BrowserStack Automate (AI features)", url: "https://www.browserstack.com/automate" }] },
          { name: "AI for Root Cause Analysis", description: "Identifies patterns in failures and suggests potential root causes.", examples: [{ name: "Sentry (AI features)", url: "https://sentry.io/ai/" }, { name: "Datadog (AI for error tracking)", url: "https://www.datadoghq.com/" }] }
        ]
      }
    ]
  },
  {
    department: "Development Team",
    icon: LaptopMinimal,
    tasks: [
      {
        name: "Code Generation & Refactoring",
        tools: [
          { name: "AI Code Assistants", description: "Writes functions, completes code, and assists in refactoring existing codebases.", examples: [{ name: "GitHub Copilot", url: "https://github.com/features/copilot" }, { name: "AWS CodeWhisperer", url: "https://aws.amazon.com/codewhisperer/" }, { name: "Google Gemini for Developers", url: "https://ai.google.dev/models/gemini" }] },
          { name: "AI-Powered IDEs/Environments", description: "Facilitates real-time pair programming with AI and collaborative debugging.", examples: [{ name: "VS Code with AI extensions", url: "https://code.visualstudio.com/" }, { name: "JetBrains AI Assistant", url: "https://www.jetbrains.com/ai/" }] },
          { name: "AI for API Design", description: "Guides AI to provide feedback on API designs from an experienced developer's perspective.", examples: [{ name: "Postman (AI features)", url: "https://www.postman.com/product/ai-agent-builder/" }, { name: "Stoplight (AI design assist)", url: "https://stoplight.io/" }] }
        ]
      },
      {
        name: "Debugging & Optimization",
        tools: [
          { name: "AI Debugging Tools", description: "Helps debug obscure errors, explains complex code, and identifies potential issues.", examples: [{ name: "Snyk Code (AI security)", url: "https://snyk.io/" }, { name: "DeepCode AI (now Snyk Code)", url: "https://www.snyk.io/blog/snyk-acquires-deepcode/" }] },
          { name: "AI Performance Optimizers", description: "Prompts AI to analyze code for performance bottlenecks and suggest optimized versions.", examples: [{ name: "Datadog APM (AI insights)", url: "https://www.datadoghq.com/product/apm/" }, { name: "New Relic CodeStream (AI features)", url: "https://newrelic.com/products/codestream" }] },
          { name: "AI for Architecture Design", description: "Assists in proposing multiple architectural solutions and evaluating trade-offs for complex problems.", examples: [{ name: "Lucidchart (with AI features)", url: "https://www.lucidchart.com/pages" }, { name: "Miro (AI brainstorming)", url: "https://miro.com/ai/" }] }
        ]
      }
    ]
  }
];

// --- Latest AI News Data ---
const latestAINews = [
  {
    title: "Revolutionary Multimodal AI: GPT-4o & Project Astra",
    description: "New models like OpenAI's GPT-4o and Google's Project Astra demonstrate unprecedented capabilities in understanding and generating content across text, audio, image, and video in real-time, enabling more natural and intuitive human-AI interaction.",
    url: "[https://openai.com/index/hello-gpt-4o/](https://openai.com/index/hello-gpt-4o/)",
    category: "Foundation Models & Interaction",
    icon: Brain
  },
  {
    title: "Advancements in Agentic AI for Business Automation",
    description: "Autonomous AI agents are increasingly capable of planning and executing multi-step tasks by interacting with various tools and APIs, leading to new levels of automation in complex business workflows.",
    url: "[https://www.microsoft.com/en-us/research/blog/autonomous-ai-agents-are-coming-what-does-that-mean-for-business/](https://www.microsoft.com/en-us/research/blog/autonomous-ai-agents-are-coming-what-does-that-mean-for-business/)", // Example general article
    category: "Applications & Automation",
    icon: Bot // Changed from Robot to Bot
  },
  {
    title: "Rise of Efficient Small Language Models (SLMs)",
    description: "Smaller, more efficient language models (e.g., Microsoft's Phi-3, Google's Gemma) are emerging, offering powerful on-device or edge computing capabilities, reducing costs, and enabling new privacy-preserving applications.",
    url: "[https://www.microsoft.com/en-us/research/blog/phi-3-mini-a-new-era-of-slms/](https://www.microsoft.com/en-us/research/blog/phi-3-mini-a-new-era-of-slms/)", // Example for Phi-3
    category: "Efficiency & Deployment",
    icon: Lightbulb
  },
  {
    title: "AI Integration Deepens in Enterprise Software",
    description: "Major enterprise software vendors are embedding AI capabilities directly into their platforms (e.g., Microsoft Copilot in M365, Salesforce Einstein), transforming productivity and decision-making for business users.",
    url: "[https://www.microsoft.com/en-us/microsoft-365/microsoft-copilot](https://www.microsoft.com/en-us/microsoft-365/microsoft-copilot)",
    category: "Enterprise Adoption",
    icon: Briefcase
  },
  {
    title: "AI for Accelerated Scientific Discovery",
    description: "AI is revolutionizing fields like drug discovery, materials science, and climate modeling by rapidly analyzing vast datasets, predicting outcomes, and accelerating research cycles, with significant business implications.",
    url: "[https://www.deepmind.com/blog/alphafold-is-transforming-biology](https://www.deepmind.com/blog/alphafold-is-transforming-biology)", // AlphaFold example
    category: "Industry Specific Applications",
    icon: FlaskConical
  }
];


const App = () => {
  const [activeTab, setActiveTab] = useState('home'); // Default to 'home' tab
  const [selectedItem, setSelectedItem] = useState(null); // Holds selected technique, model, tool, or news item
  const [generatedPrompt, setGeneratedPrompt] = useState(''); // Stores the generated prompt from Gemini (for prompting techniques)
  const [promptInput, setPromptInput] = useState(''); // Stores user's scenario/task input (for prompting techniques)
  const [selectedTeamForPrompt, setSelectedTeamForPrompt] = useState('Sales Team'); // Default team for prompt generation (for prompting techniques)
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(false); // Loading state for Gemini API call (for prompting techniques)
  const [promptError, setPromptError] = useState(''); // Error message for Gemini API call (for prompting techniques)

  const [generatedDepartmentPrompt, setGeneratedDepartmentPrompt] = useState(''); // Stores generated prompt for department tools
  const [isLoadingDepartmentPrompt, setIsLoadingDepartmentPrompt] = useState(false); // Loading state for department tool prompt
  const [departmentPromptError, setDepartmentPromptError] = useState(''); // Error for department tool prompt


  const closeModal = () => {
    setSelectedItem(null);
    setGeneratedPrompt(''); // Clear generated prompt when modal closes
    setPromptInput(''); // Clear input when modal closes
    setPromptError(''); // Clear error when modal closes
    setGeneratedDepartmentPrompt(''); // Clear department prompt
    setDepartmentPromptError(''); // Clear department prompt error
  };

  // Effect hook to handle Escape key press for modal closure
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && selectedItem) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts or selectedItem changes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]); // Dependency array: re-run effect if selectedItem changes

  let currentData = [];
  let currentCategories = [];
  let currentTitle = '';
  let currentModalTitlePrefix = '';

  if (activeTab === 'techniques') {
    currentData = techniques;
    currentCategories = [...new Set(currentData.map(item => item.category))];
    currentTitle = 'Key Prompt Engineering Techniques';
    currentModalTitlePrefix = '';
  } else if (activeTab === 'models') {
    currentData = models;
    currentCategories = [...new Set(currentData.map(item => item.category))];
    currentTitle = 'Types of AI Models Available Today';
    currentModalTitlePrefix = 'AI Model: ';
  } else if (activeTab === 'departments') {
    currentData = departmentTools; // This data is structured differently
    currentTitle = 'AI Tools by Department & Use Case';
    currentModalTitlePrefix = ''; // No prefix needed for department tools modal
  } else if (activeTab === 'news') {
    currentData = latestAINews;
    currentCategories = [...new Set(currentData.map(item => item.category))];
    currentTitle = 'Latest AI Breakthroughs & Business News';
    currentModalTitlePrefix = 'AI News: ';
  }

  // Function to call Gemini API to generate a prompt (for prompting techniques)
  const generateExamplePrompt = async () => {
    if (!selectedItem || !promptInput) {
      setPromptError('Please enter a scenario/task and select a team.');
      return;
    }

    setIsLoadingPrompt(true);
    setGeneratedPrompt('');
    setPromptError('');

    try {
      const prompt = `Using the "${selectedItem.name}" technique, generate an example prompt for a "${selectedTeamForPrompt}" team to "${promptInput}". The technique is described as: "${selectedItem.description}". Provide only the prompt itself, without any conversational text or explanations.`;

      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will automatically provide this in runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setGeneratedPrompt(text);
      } else {
        setPromptError('Failed to generate prompt. Unexpected API response.');
        console.error('Gemini API response structure unexpected:', result);
      }
    } catch (error) {
      setPromptError(`Error generating prompt: ${error.message}`);
      console.error('Error calling Gemini API:', error);
    } finally {
      setIsLoadingPrompt(false);
    }
  };

  // Function to generate prompt for department tools
  const generateDepartmentExamplePrompt = async () => {
    if (!selectedItem) {
      setDepartmentPromptError('No department tool selected.');
      return;
    }

    setIsLoadingDepartmentPrompt(true);
    setGeneratedDepartmentPrompt('');
    setDepartmentPromptError('');

    try {
      const prompt = `Generate a very good example of a practical prompt for an AI tool named '${selectedItem.name}' used by the '${selectedItem.department}' team for the task of '${selectedItem.task}'. The tool's description is: '${selectedItem.description}'. The prompt should be ready for a user to input into an AI model to achieve the described use case. Provide only the prompt itself, without any conversational text or explanations.`;

      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will automatically provide this in runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setGeneratedDepartmentPrompt(text);
      } else {
        setDepartmentPromptError('Failed to generate prompt. Unexpected API response.');
        console.error('Gemini API response structure unexpected:', result);
      }
    } catch (error) {
      setDepartmentPromptError(`Error generating prompt: ${error.message}`);
      console.error('Error calling Gemini API:', error);
    } finally {
      setIsLoadingDepartmentPrompt(false);
    }
  };


  const allTeams = [...new Set(techniques.flatMap(tech => tech.teamApplications.map(app => app.team)))];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 sm:p-8 font-inter antialiased">
      <div className="max-w-7xl mx-auto py-8">

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 border-b border-gray-700 flex-wrap">
          <button
            className={`px-4 sm:px-6 py-3 text-sm sm:text-lg font-semibold rounded-t-lg transition-colors duration-300 ${
              activeTab === 'home'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('home')}
          >
            <Home className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> Home
          </button>
          <button
            className={`px-4 sm:px-6 py-3 text-sm sm:text-lg font-semibold rounded-t-lg transition-colors duration-300 ${
              activeTab === 'techniques'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200'
            }`}
            onClick={() => setSelectedItem(null) || setActiveTab('techniques')} // Close modal if open, then set tab
          >
            Prompting Techniques
          </button>
          <button
            className={`px-4 sm:px-6 py-3 text-sm sm:text-lg font-semibold rounded-t-lg transition-colors duration-300 ${
              activeTab === 'models'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200'
            }`}
            onClick={() => setSelectedItem(null) || setActiveTab('models')} // Close modal if open, then set tab
          >
            AI Models And Tools
          </button>
          <button
            className={`px-4 sm:px-6 py-3 text-sm sm:text-lg font-semibold rounded-t-lg transition-colors duration-300 ${
              activeTab === 'departments'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200'
            }`}
            onClick={() => setSelectedItem(null) || setActiveTab('departments')} // Close modal if open, then set tab
          >
            AI Tools by Department
          </button>
          <button
            className={`px-4 sm:px-6 py-3 text-sm sm:text-lg font-semibold rounded-t-lg transition-colors duration-300 ${
              activeTab === 'news'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200'
            }`}
            onClick={() => setSelectedItem(null) || setActiveTab('news')} // Close modal if open, then set tab
          >
            <Newspaper className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> Latest AI News
          </button>
        </div>

        {/* Home Tab Content */}
        {activeTab === 'home' && (
          <div className="text-center py-12 px-4 sm:px-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
              Welcome to the AI Empowerment Session!
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              **Prompt Engineering** is the crucial skill for effectively communicating with AI. It's about crafting precise instructions to unlock the full potential of AI models, transforming them into powerful assistants for your daily tasks.
            </p>
            <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
              **Why is it important to learn today?** The rapid evolution of AI means mastering prompt engineering is no longer optional. It's essential for boosting efficiency, enhancing output quality, and driving innovation across all teams in our organization.
            </p>
            
          </div>
        )}

        {/* Prompting Techniques & AI Models Tabs Content */}
        {activeTab === 'techniques' || activeTab === 'models' ? (
          <>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg p-2 shadow-lg">
              {currentTitle}
            </h1>
            {currentCategories.map(category => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-purple-300 border-b-2 border-purple-500 pb-2">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentData
                    .filter(item => item.category === category)
                    .map((item, index) => (
                      <div
                        key={item.name}
                        className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="flex items-center mb-4">
                          {item.icon && <item.icon className="w-8 h-8 text-pink-400 mr-3" />}
                          <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {typeof item.description === 'string' ? item.description : item.description}
                        </p>
                        {activeTab === 'models' && item.examples && (
                          <p className="text-gray-400 text-xs mt-2">
                            <span className="font-medium">Examples:</span> {item.examples}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </>
        ) : null}

        {/* AI Tools by Department Tab Content */}
        {activeTab === 'departments' && (
          <>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg p-2 shadow-lg">
              {currentTitle}
            </h1>
            <div className="space-y-10">
              {departmentTools.map(dept => (
                <div key={dept.department} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                  <h2 className="text-3xl font-bold text-purple-300 mb-6 flex items-center">
                    {dept.icon && <dept.icon className="w-9 h-9 text-pink-400 mr-3" />} {dept.department}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {dept.tasks.map(task => (
                      <div key={task.name} className="bg-gray-700 p-5 rounded-lg shadow-md border border-gray-600">
                        <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-500 pb-2">
                          {task.name}
                        </h3>
                        <div className="space-y-3">
                          {task.tools.map(tool => (
                            <div
                              key={tool.name}
                              className="bg-gray-600 p-3 rounded-md shadow-sm border border-gray-500 cursor-pointer hover:bg-gray-500 transition-colors duration-200"
                      
                            >
                              <h4 className="text-lg font-medium text-white">{tool.name}</h4>
                              <p className="text-gray-300 text-sm">{tool.description}</p>
                              {tool.examples && (
                                <div className="mt-2 text-xs text-gray-400">
                                  <span className="font-medium">Examples:</span>
                                  <ul className="list-disc list-inside ml-2">
                                    {tool.examples.map(example => (
                                      <li key={example.name}>
                                        <a href={example.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
                                          {example.name}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Latest AI News Tab Content */}
        {activeTab === 'news' && (
          <>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg p-2 shadow-lg">
              {currentTitle}
            </h1>
            {currentCategories.map(category => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-purple-300 border-b-2 border-purple-500 pb-2">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentData
                    .filter(item => item.category === category)
                    .map((item, index) => (
                      <div
                        key={item.title}
                        className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        onClick={() => setSelectedItem({ ...item, type: 'news' })}
                      >
                        <div className="flex items-center mb-4">
                          {item.icon && <item.icon className="w-8 h-8 text-pink-400 mr-3" />}
                          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {item.description}
                        </p>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline text-sm mt-3 inline-block"
                            onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking link
                          >
                            Read More
                          </a>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Modal for selected item details */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={closeModal}>
            <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 max-w-lg w-full relative transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <XCircle className="w-8 h-8" />
              </button>
              <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 pb-2 border-b border-gray-600">
                {currentModalTitlePrefix}
                {selectedItem.name || selectedItem.title}
              </h2>
              <p className="text-gray-300 text-base mb-4">
                {typeof selectedItem.description === 'string' ? selectedItem.description : selectedItem.description}
              </p>

              {/* Conditional rendering for different item types */}
              {selectedItem.type === 'department-tool' && (
                <>
                  <p className="text-gray-400 text-sm mb-2">
                    <span className="font-medium">Department:</span> {selectedItem.department}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    <span className="font-medium">Task:</span> {selectedItem.task}
                  </p>
                  {selectedItem.examples && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-white mb-2">Examples:</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {selectedItem.examples.map(example => (
                          <li key={example.name}>
                            <a href={example.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
                              {example.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Gemini API Integration for Department Prompt Generation */}
                  <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
                    <h4 className="text-lg font-semibold text-white mb-3">Generate Example Prompt for this Tool ✨</h4>
                    <button
                      onClick={generateDepartmentExamplePrompt}
                      className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoadingDepartmentPrompt}
                    >
                      {isLoadingDepartmentPrompt ? (
                        <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        'Generate Prompt'
                      )}
                    </button>
                    {departmentPromptError && (
                      <p className="text-red-400 text-sm mt-3">{departmentPromptError}</p>
                    )}
                    {generatedDepartmentPrompt && (
                      <div className="mt-4 p-3 bg-gray-900 rounded-md border border-purple-500">
                        <h5 className="text-md font-semibold text-purple-300 mb-2">Generated Prompt:</h5>
                        <pre className="whitespace-pre-wrap text-gray-200 text-sm font-mono bg-gray-800 p-2 rounded-md overflow-x-auto">
                          {generatedDepartmentPrompt}
                        </pre>
                      </div>
                    )}
                  </div>
                </>
              )}

              {selectedItem.type === 'news' && (
                <>
                  <p className="text-gray-400 text-sm mb-2">
                    <span className="font-medium">Category:</span> {selectedItem.category}
                  </p>
                  {selectedItem.url && (
                    <a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-base mt-3 inline-block"
                    >
                      Read Full Article
                    </a>
                  )}
                </>
              )}

              {/* Display Team Applications for Prompting Techniques */}
              {activeTab === 'techniques' && selectedItem.teamApplications && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-white mb-2 pb-1 border-b border-gray-600">Applications by Team:</h4>
                  <div className="space-y-3">
                    {selectedItem.teamApplications.map((app, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded-md shadow-sm">
                        <p className="text-purple-300 font-medium">{app.team}:</p>
                        <p className="text-gray-300 text-sm">{app.useCase}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'models' && selectedItem.examples && selectedItem.type !== 'department-tool' && (
                <p className="text-gray-400 text-sm mt-4">
                  <span className="font-medium">Examples:</span> {selectedItem.examples}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
