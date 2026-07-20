window.WEEKS_DATA = window.WEEKS_DATA || {};
window.WEEKS_DATA['operations-management'] = window.WEEKS_DATA['operations-management'] || {};
window.WEEKS_DATA['operations-management'][9] = {
  week: 9,
  status: 'not-started',
  title: { pt: 'Gestão da Qualidade', en: 'Quality Management' },
  overview: {
    pt: 'A qualidade é a fundação de tudo que vimos (lembra do cone de areia na Semana 8?). Mas atenção ao conceito: em gestão, qualidade NÃO é luxo nem "sensação de caro" (como um Rolex). É consistência, confiabilidade e conformidade com a especificação — fazer sempre exatamente igual, do jeito certo. O prof. Pilkington resume: reliability, consistency e conforming to standard. Esta semana: as várias DIMENSÕES da qualidade (Garvin), os GURUS que a fundaram (Deming, Juran, Crosby, Ishikawa), a EVOLUÇÃO da qualidade (de inspecionar produto pronto até construir sistemas que não erram — TQM, Six Sigma), e as FERRAMENTAS práticas (os 7 tools da qualidade e o SPC — controle estatístico de processo). Duas ideias-chave: "zero defeitos" (zero defects) e "certo da primeira vez" (right first time) — sempre mais barato que consertar depois (o caso Tesla).',
    en: 'Quality is the foundation of everything we have seen (remember the sand cone in Week 8?). But mind the concept: in management, quality is NOT luxury or a "feels expensive" sensation (like a Rolex). It is consistency, reliability and conformance to specification — always doing exactly the same, the right way. Prof. Pilkington sums it up: reliability, consistency and conforming to standard. This week: the various DIMENSIONS of quality (Garvin), the GURUS who founded it (Deming, Juran, Crosby, Ishikawa), the EVOLUTION of quality (from inspecting finished product to building systems that don\'t err — TQM, Six Sigma), and the practical TOOLS (the 7 quality tools and SPC — statistical process control). Two key ideas: "zero defects" and "right first time" — always cheaper than fixing later (the Tesla case).'
  },
  concepts: [
    {
      pt: 'Qualidade (em termos de gestão)',
      en: 'Quality (in management terms)',
      definition: {
        pt: 'Não é luxo, exclusividade nem "sensação de caro" (uso comum: Rolex, Rolls-Royce). Em gestão é consistência, confiabilidade e conformidade com a especificação — fazer o processo/produto sempre exatamente igual, controlado e repetível. Em manufatura mede-se por dimensões; em serviços, quem define a qualidade é o CLIENTE.',
        en: 'It is not luxury, exclusivity or a "feels expensive" sensation (everyday use: Rolex, Rolls-Royce). In management it is consistency, reliability and conformance to specification — doing the process/product always exactly the same, controlled and repeatable. In manufacturing it is measured by dimensions; in services, the CUSTOMER defines quality.'
      }
    },
    {
      pt: 'As Dimensões da Qualidade (Garvin)',
      en: 'Dimensions of Quality (Garvin)',
      definition: {
        pt: 'Garvin (1987) mostrou que "qualidade" tem múltiplas facetas. 5 abordagens (transcendente/inata, baseada no produto, no usuário, no valor, na manufatura) e 8 dimensões de um produto: desempenho, características, confiabilidade, conformidade, durabilidade, atendibilidade (serviceability), estética e qualidade percebida. A Apple se destaca na percebida (alumínio pesado = "sensação de qualidade").',
        en: 'Garvin (1987) showed that "quality" has multiple facets. 5 approaches (transcendent/innate, product-based, user-based, value-based, manufacturing-based) and 8 dimensions of a product: performance, features, reliability, conformance, durability, serviceability, aesthetics and perceived quality. Apple excels at perceived (heavy aluminium = a "quality feel").'
      }
    },
    {
      pt: 'Qualidade em Serviços (as 5 dimensões / SERVQUAL)',
      en: 'Service Quality (the 5 dimensions / SERVQUAL)',
      definition: {
        pt: 'Em serviços, o cliente define a qualidade — a mesma experiência (ex: ligar para o banco) pode ser "ótima" para um e "péssima" para outro. Mede-se por 5 dimensões (mnemônico RATER): Reliability (confiabilidade), Assurance (garantia/competência), Tangibles (aspectos físicos), Empathy (empatia) e Responsiveness (prontidão). O modelo de gaps aponta as brechas entre o que o cliente espera e o que recebe.',
        en: 'In services, the customer defines quality — the same experience (e.g. phoning the bank) can be "great" for one and "terrible" for another. It is measured by 5 dimensions (RATER mnemonic): Reliability, Assurance, Tangibles, Empathy and Responsiveness. The gaps model points to the gaps between what the customer expects and what they receive.'
      }
    },
    {
      pt: 'Zero Defeitos & Certo da Primeira Vez',
      en: 'Zero Defects & Right First Time',
      definition: {
        pt: 'Metas centrais da qualidade moderna (Crosby). "Zero defeitos" = a meta de não produzir nenhum erro. "Certo da primeira vez" (right first time) = fazer bem já na primeira, em vez de inspecionar e corrigir depois. É sempre mais barato: consertar um defeito na fábrica custa menos que no cliente (o caso Tesla).',
        en: 'Central goals of modern quality (Crosby). "Zero defects" = the goal of producing no errors. "Right first time" = doing it well the first time, instead of inspecting and fixing later. It is always cheaper: fixing a defect in the factory costs less than at the customer (the Tesla case).'
      }
    },
    {
      pt: 'Custo da Qualidade',
      en: 'Cost of Quality',
      definition: {
        pt: 'A qualidade tem custos de PREVENÇÃO (evitar o erro), de AVALIAÇÃO (inspecionar) e de FALHA (interna, antes de sair; externa, no cliente — a mais cara). Investir em prevenção reduz drasticamente as falhas. A lição do caso Tesla: consertar depois (recall) é muito mais caro que ter feito certo na fábrica.',
        en: 'Quality has PREVENTION costs (avoid the error), APPRAISAL costs (inspect) and FAILURE costs (internal, before it ships; external, at the customer — the most expensive). Investing in prevention drastically cuts failures. The Tesla lesson: fixing later (recall) is far costlier than having made it right in the factory.'
      }
    },
    {
      pt: 'Evolução da Qualidade (até TQM e Six Sigma)',
      en: 'Evolution of Quality (to TQM and Six Sigma)',
      definition: {
        pt: 'A qualidade evoluiu em 6 níveis, cada um englobando o anterior (Figura 13.4): Inspeção (checar o produto pronto) → Controle de Qualidade (QC, detectar defeitos) → Garantia da Qualidade (QA, prevenir, proativo) → Gestão da Qualidade Total (TQM, todos envolvidos) → Six Sigma (estatístico, quase zero defeito) → Lean Six Sigma (LSS). Deixou de ser "checar produto pronto" para "construir sistemas que não erram".',
        en: 'Quality evolved through 6 levels, each subsuming the previous (Figure 13.4): Inspection (check the finished product) → Quality Control (QC, detect defects) → Quality Assurance (QA, prevent, proactive) → Total Quality Management (TQM, everyone involved) → Six Sigma (statistical, near-zero defect) → Lean Six Sigma (LSS). It moved from "check the finished product" to "build systems that don\'t err".'
      }
    },
    {
      pt: 'Gestão da Qualidade Total (TQM)',
      en: 'Total Quality Management (TQM)',
      definition: {
        pt: 'Abordagem proativa em que TODOS na organização, em todos os níveis, se responsabilizam pela qualidade — não só um departamento de inspeção. Foco no cliente, melhoria contínua (kaizen) e envolvimento de todos. É o nível da evolução antes do Six Sigma.',
        en: 'A proactive approach in which EVERYONE in the organization, at all levels, takes responsibility for quality — not just an inspection department. Customer focus, continuous improvement (kaizen) and everyone\'s involvement. It is the evolution level before Six Sigma.'
      }
    },
    {
      pt: 'Six Sigma & o Ciclo DMAIC',
      en: 'Six Sigma & the DMAIC Cycle',
      definition: {
        pt: 'Método estatístico rigoroso para reduzir variação a níveis mínimos: "seis sigma" = apenas 3,4 defeitos por milhão de oportunidades. Usa o ciclo DMAIC (Define, Measure, Analyze, Improve, Control — extensão do PDCA de Deming). Combinado com o lean vira Lean Six Sigma.',
        en: 'A rigorous statistical method to reduce variation to minimal levels: "six sigma" = only 3.4 defects per million opportunities. It uses the DMAIC cycle (Define, Measure, Analyze, Improve, Control — an extension of Deming\'s PDCA). Combined with lean it becomes Lean Six Sigma.'
      }
    },
    {
      pt: 'Ciclo PDCA (Deming/Shewhart)',
      en: 'PDCA Cycle (Deming/Shewhart)',
      definition: {
        pt: 'Plan-Do-Check-Act (Planejar-Fazer-Checar-Agir): o ciclo de melhoria contínua de Deming. Planeje uma mudança, faça em pequena escala, cheque os resultados, aja para padronizar ou ajustar — e repita. É a base do kaizen e do DMAIC.',
        en: 'Plan-Do-Check-Act: Deming\'s continuous improvement cycle. Plan a change, do it small-scale, check the results, act to standardize or adjust — and repeat. It is the basis of kaizen and DMAIC.'
      }
    },
    {
      pt: 'Os 7 Tools da Qualidade',
      en: 'The 7 Tools of Quality',
      definition: {
        pt: 'Sete ferramentas simples e visuais que qualquer um pode usar para controlar e monitorar seu próprio desempenho: Fluxograma (flow chart), Folha de Verificação (check sheet), Histograma, Diagrama de Pareto, Diagrama de Dispersão (scatter), Diagrama de Causa-e-Efeito (Ishikawa/espinha de peixe) e Gráfico de Controle (control chart). Popularizadas por Ishikawa.',
        en: 'Seven simple, visual tools anyone can use to control and monitor their own performance: Flow chart, Check sheet, Histogram, Pareto diagram, Scatter diagram, Cause-and-effect diagram (Ishikawa/fishbone) and Control chart. Popularized by Ishikawa.'
      }
    },
    {
      pt: 'Controle Estatístico de Processo (SPC)',
      en: 'Statistical Process Control (SPC)',
      definition: {
        pt: 'Técnica que monitora um processo medindo-o ao longo do tempo e sinalizando quando a variação é INESPERADA (causa especial) em vez de normal (causa comum). Usa o gráfico de controle com limites (superior/inferior). Não precisa dominar a matemática — basta entender que é um jeito rápido de detectar quando o processo saiu do padrão projetado.',
        en: 'A technique that monitors a process by measuring it over time and flagging when variation is UNEXPECTED (special cause) rather than normal (common cause). It uses the control chart with limits (upper/lower). You don\'t need to master the maths — just grasp that it is a fast way to detect when the process has drifted from its designed standard.'
      }
    },
    {
      pt: 'Capacidade de Processo (Process Capability)',
      en: 'Process Capability',
      definition: {
        pt: 'O quanto um processo consegue, de forma consistente, produzir dentro dos limites da especificação. Um processo "capaz" tem sua variação natural bem dentro das tolerâncias permitidas. É o que o SPC ajuda a avaliar e melhorar.',
        en: 'How well a process can consistently produce within the specification limits. A "capable" process has its natural variation comfortably inside the allowed tolerances. It is what SPC helps to assess and improve.'
      }
    },
    {
      pt: 'Prêmios de Qualidade (Deming, EFQM, Baldrige)',
      en: 'Quality Awards (Deming, EFQM, Baldrige)',
      definition: {
        pt: 'Reconhecimentos que fundamentam e difundem as boas práticas de qualidade. O Prêmio Deming (Japão) é dado a empresas e indivíduos de excelência. Equivalentes: o modelo EFQM (Europa) e o Malcolm Baldrige Award (EUA), cada um com seus critérios de avaliação.',
        en: 'Recognitions that underpin and spread good quality practice. The Deming Prize (Japan) is given to outstanding firms and individuals. Equivalents: the EFQM model (Europe) and the Malcolm Baldrige Award (USA), each with its own assessment criteria.'
      }
    }
  ],
  theories: [
    {
      name: { pt: 'As Dimensões da Qualidade de Garvin', en: "Garvin's Dimensions of Quality" },
      authors: ['Garvin'],
      year: '1987',
      renderer: 'qualityDimensions',
      description: {
        pt: 'Garvin (1987) desfez a confusão do que é "qualidade" mostrando que ela tem múltiplas facetas. Primeiro, 5 abordagens para defini-la: transcendente (excelência inata, "reconheço quando vejo"), baseada no produto (mais características = mais qualidade), baseada no usuário (o que satisfaz o cliente), baseada no valor (desempenho pelo preço) e baseada na manufatura (conformidade com a especificação — a mais útil para operações). Depois, 8 dimensões concretas de um produto (exemplos num carro): desempenho, características, confiabilidade, conformidade, durabilidade, atendibilidade, estética e qualidade percebida. Clique em cada dimensão.',
        en: 'Garvin (1987) cleared up the confusion of what "quality" is by showing it has multiple facets. First, 5 approaches to define it: transcendent (innate excellence, "I know it when I see it"), product-based (more features = more quality), user-based (whatever satisfies the customer), value-based (performance for the price) and manufacturing-based (conformance to specification — the most useful for operations). Then, 8 concrete dimensions of a product (examples in a car): performance, features, reliability, conformance, durability, serviceability, aesthetics and perceived quality. Click each dimension.'
      }
    },
    {
      name: { pt: 'A Evolução da Gestão da Qualidade', en: 'The Evolution of Quality Management' },
      authors: [],
      year: '',
      renderer: 'qualityEvolution',
      description: {
        pt: 'A grande virada da semana: a qualidade deixou de ser "checar o produto pronto no final" e passou a ser "construir sistemas que não erram desde o começo". A Figura 13.4 mostra isso como 6 níveis aninhados, cada um englobando (subsumindo) o anterior: Inspeção (checagem retrospectiva do produto acabado) → Controle de Qualidade/QC (sistema para detectar defeitos, auto-inspeção, teste de produto) → Garantia da Qualidade/QA (proativo, prevenir o defeito) → Gestão da Qualidade Total/TQM (todos, em todos os níveis, se responsabilizam) → Six Sigma/SS (rigor estatístico, 3,4 defeitos por milhão) → Lean Six Sigma/LSS (une lean + Six Sigma). Cada nível não substitui, mas ENGLOBA o anterior. Clique para subir os níveis.',
        en: 'The week\'s big turn: quality stopped being "check the finished product at the end" and became "build systems that don\'t err from the start". Figure 13.4 shows this as 6 nested levels, each subsuming the previous: Inspection (retrospective checking of the finished product) → Quality Control/QC (a system to detect defects, self-inspection, product testing) → Quality Assurance/QA (proactive, prevent the defect) → Total Quality Management/TQM (everyone, at all levels, takes responsibility) → Six Sigma/SS (statistical rigour, 3.4 defects per million) → Lean Six Sigma/LSS (unites lean + Six Sigma). Each level does not replace but SUBSUMES the previous one. Click to climb the levels.'
      }
    },
    {
      name: { pt: 'Os 7 Tools da Qualidade', en: 'The 7 Tools of Quality' },
      authors: ['Ishikawa'],
      year: '',
      renderer: 'sevenTools',
      description: {
        pt: 'Sete ferramentas simples, visuais e baratas que QUALQUER pessoa (não só especialistas) pode usar para controlar e monitorar a qualidade do seu próprio trabalho. Foram popularizadas por Kaoru Ishikawa. São elas: Fluxograma (mapeia o processo passo a passo), Folha de Verificação (conta ocorrências), Histograma (mostra a distribuição), Diagrama de Pareto (o 80/20 — quais poucas causas geram a maioria dos problemas), Diagrama de Dispersão (correlação entre duas variáveis), Diagrama de Causa-e-Efeito ou "espinha de peixe" de Ishikawa (organiza as causas-raiz), e Gráfico de Controle (monitora a variação ao longo do tempo — a base do SPC). Clique em cada uma.',
        en: 'Seven simple, visual, cheap tools that ANYONE (not just specialists) can use to control and monitor the quality of their own work. They were popularized by Kaoru Ishikawa. They are: Flow chart (maps the process step by step), Check sheet (counts occurrences), Histogram (shows the distribution), Pareto diagram (the 80/20 — which few causes generate most problems), Scatter diagram (correlation between two variables), Cause-and-effect or Ishikawa "fishbone" diagram (organizes root causes), and Control chart (monitors variation over time — the basis of SPC). Click each one.'
      }
    },
    {
      name: { pt: 'Gráfico de Controle (SPC)', en: 'Control Chart (SPC)' },
      authors: ['Shewhart'],
      year: '',
      renderer: 'spcChart',
      description: {
        pt: 'O coração do Controle Estatístico de Processo (SPC). O gráfico de controle plota as medições de um processo ao longo do tempo, com uma linha central (a média) e dois limites de controle: superior (UCL) e inferior (LCL). Enquanto os pontos ficam DENTRO dos limites e sem padrão estranho, a variação é NORMAL (causa comum) — o processo está "sob controle". Quando um ponto ESTOURA um limite (ou aparece um padrão suspeito), é sinal de causa ESPECIAL — algo mudou e precisa de investigação. É assim que o SPC detecta rapidamente quando o processo saiu do padrão projetado, sem esperar o produto final. (Não precisa dominar a matemática — basta a ideia.) Veja a animação.',
        en: 'The heart of Statistical Process Control (SPC). The control chart plots a process\'s measurements over time, with a centre line (the mean) and two control limits: upper (UCL) and lower (LCL). As long as points stay WITHIN the limits and show no odd pattern, variation is NORMAL (common cause) — the process is "in control". When a point BREACHES a limit (or a suspicious pattern appears), it signals a SPECIAL cause — something changed and needs investigation. This is how SPC quickly detects when the process has drifted from its designed standard, without waiting for the final product. (You don\'t need to master the maths — just the idea.) Watch the animation.'
      }
    }
  ],
  authors: [
    {
      name: 'W. Edwards Deming',
      role: { pt: 'Guru da qualidade, "pedra angular" da qualidade moderna', en: 'Quality guru, the "cornerstone" of modern quality' },
      contribution: { pt: 'Levou a qualidade ao Japão pós-guerra. Ver a qualidade como satisfazer o cliente (não só cumprir spec), responsabilidade da GESTÃO pelos processos, o ciclo PDCA (plan-do-check-act) e o uso de SPC. Seus 14 princípios de gestão. O Prêmio Deming leva seu nome.', en: 'Took quality to post-war Japan. Seeing quality as satisfying the customer (not just meeting spec), MANAGEMENT\'s responsibility for processes, the PDCA cycle (plan-do-check-act) and the use of SPC. His 14 management principles. The Deming Prize bears his name.' }
    },
    {
      name: 'Joseph Juran',
      role: { pt: 'Guru da qualidade, "fitness for use"', en: 'Quality guru, "fitness for use"' },
      contribution: { pt: 'Definiu qualidade como "adequação ao uso" (fitness for use) — começa por quem vai usar o produto/serviço, como e por quê. Enfatizou a gestão da qualidade (trilogia: planejamento, controle, melhoria).', en: 'Defined quality as "fitness for use" — starting from who will use the product/service, how and why. He emphasized quality management (the trilogy: planning, control, improvement).' }
    },
    {
      name: 'Philip Crosby',
      role: { pt: 'Guru da qualidade, "zero defeitos" e "quality is free"', en: 'Quality guru, "zero defects" and "quality is free"' },
      contribution: { pt: 'Popularizou "zero defeitos" e "certo da primeira vez". Argumentou que "qualidade é de graça" (quality is free): o que custa caro é a NÃO-qualidade (retrabalho, refugo, recalls). Prevenir sai mais barato que corrigir.', en: 'Popularized "zero defects" and "right first time". He argued that "quality is free": what is costly is NON-quality (rework, scrap, recalls). Preventing is cheaper than fixing.' }
    },
    {
      name: 'Kaoru Ishikawa',
      role: { pt: 'Guru da qualidade, criador do diagrama de espinha de peixe', en: 'Quality guru, creator of the fishbone diagram' },
      contribution: { pt: 'Criou o diagrama de causa-e-efeito ("espinha de peixe" / Ishikawa) e popularizou os 7 tools da qualidade, tornando o controle de qualidade acessível a todos os funcionários (não só a especialistas).', en: 'Created the cause-and-effect ("fishbone" / Ishikawa) diagram and popularized the 7 tools of quality, making quality control accessible to all employees (not just specialists).' }
    },
    {
      name: 'Armand Feigenbaum',
      role: { pt: 'Guru da qualidade, criador do Total Quality Control', en: 'Quality guru, creator of Total Quality Control' },
      contribution: { pt: 'Cunhou o "Controle Total da Qualidade" (TQC), a ideia de que a qualidade é responsabilidade de toda a organização, não só da produção — precursora do TQM.', en: 'Coined "Total Quality Control" (TQC), the idea that quality is the responsibility of the whole organization, not just production — a precursor of TQM.' }
    }
  ],
  caseStudies: [
    {
      company: 'Tesla',
      sector: { pt: 'Automotivo — má qualidade e o custo de consertar depois', en: 'Automotive — bad quality and the cost of fixing later' },
      lesson: { pt: 'A Tesla teve problemas notórios de qualidade (o próprio Elon Musk admitiu, 2021 — ex: Model X). Perguntas-chave: consertar depois custa mais que ter feito certo na fábrica? (Sim — é o "certo da primeira vez".) O índice J.D. Power (IQS) mede a qualidade inicial percebida pelos compradores dos EUA. Mostra que qualidade ruim é cara e afeta a marca.', en: 'Tesla had notorious quality problems (Elon Musk himself admitted it, 2021 — e.g. Model X). Key questions: does fixing later cost more than making it right in the factory? (Yes — it is "right first time".) The J.D. Power index (IQS) measures the initial quality perceived by US buyers. It shows bad quality is costly and hits the brand.' }
    },
    {
      company: 'Apple',
      sector: { pt: 'Tecnologia — qualidade percebida', en: 'Technology — perceived quality' },
      lesson: { pt: 'A Apple se destacou na dimensão da qualidade PERCEBIDA: usa muito alumínio, seus produtos são pesados e "parecem" mais sólidos e bem-acabados que os rivais de plástico. Mostra que a qualidade percebida (uma das 8 dimensões de Garvin) é uma vantagem competitiva real, mesmo sendo subjetiva.', en: 'Apple stood out on the PERCEIVED quality dimension: it uses lots of aluminium, its products are heavy and "feel" more solid and well-finished than plastic rivals. It shows perceived quality (one of Garvin\'s 8 dimensions) is a real competitive advantage, even though subjective.' }
    },
    {
      company: 'Kellogg\'s',
      sector: { pt: 'Alimentos — qualidade de produto (processo documentado)', en: 'Food — product quality (documented process)' },
      lesson: { pt: 'O sistema de qualidade da Kellogg\'s (baseado no GFSI, food safety) NÃO menciona perguntar ao cliente: o processo em si precisa ser rigorosamente documentado e medido, com especificações estritas. Contrasta com serviços (bancos, seguros), onde a qualidade é definida pela percepção do cliente.', en: 'Kellogg\'s quality system (based on the GFSI, food safety) does NOT mention asking the customer: the process itself must be strictly documented and measured, with strict specifications. It contrasts with services (banks, insurance), where quality is defined by the customer\'s perception.' }
    },
    {
      company: 'Banco (exemplo do prof. Pilkington)',
      sector: { pt: 'Serviços — o cliente define a qualidade', en: 'Services — the customer defines quality' },
      lesson: { pt: 'Ligar para o banco: mesma experiência objetiva (10 toques, um pouco de espera, transferência que resolve o problema em 3 min) pode ser "alta qualidade" para um cliente e "péssima" para outro. Prova que, em serviços, a qualidade é subjetiva e definida pelo cliente — daí as 5 dimensões do SERVQUAL para medi-la.', en: 'Phoning the bank: the same objective experience (10 rings, a little wait, a transfer that solves the problem in 3 min) can be "high quality" for one customer and "terrible" for another. It proves that, in services, quality is subjective and customer-defined — hence SERVQUAL\'s 5 dimensions to measure it.' }
    },
    {
      company: 'Safefood (indústria alimentícia)',
      sector: { pt: 'Alimentos — SPC na prática', en: 'Food — SPC in practice' },
      lesson: { pt: 'O software Safefood 360 usa SPC para monitorar processos na indústria de alimentos, sinalizando quando a variação estatística é inesperada (não a variabilidade normal). Exemplo de implantação: uma fábrica de salsichas com 20 funcionários precisa de um plano de 5 etapas cobrindo posse gerencial do projeto, treinamento e introdução do SPC.', en: 'Safefood 360 software uses SPC to monitor processes in the food industry, flagging when statistical variation is unexpected (not normal variability). Implementation example: a 20-employee sausage factory needs a 5-stage plan covering management ownership of the project, training and introducing SPC.' }
    }
  ],
  glossary: [
    { term: 'Quality (gestão)', definition: { pt: 'Consistência, confiabilidade e conformidade com a especificação. NÃO é luxo/percepção de caro.', en: 'Consistency, reliability and conformance to specification. NOT luxury/expensive perception.' } },
    { term: 'Garvin\'s 8 dimensions', definition: { pt: 'Desempenho, características, confiabilidade, conformidade, durabilidade, atendibilidade, estética, qualidade percebida.', en: 'Performance, features, reliability, conformance, durability, serviceability, aesthetics, perceived quality.' } },
    { term: 'SERVQUAL (RATER)', definition: { pt: '5 dimensões da qualidade em serviços: Reliability, Assurance, Tangibles, Empathy, Responsiveness.', en: '5 dimensions of service quality: Reliability, Assurance, Tangibles, Empathy, Responsiveness.' } },
    { term: 'Gaps model', definition: { pt: 'Modelo que mapeia as brechas (gaps) entre a expectativa do cliente e o serviço entregue.', en: 'A model mapping the gaps between customer expectation and delivered service.' } },
    { term: 'Zero defects', definition: { pt: 'Meta de não produzir nenhum defeito (Crosby).', en: 'The goal of producing no defects (Crosby).' } },
    { term: 'Right first time', definition: { pt: 'Fazer certo já na primeira vez, em vez de inspecionar e corrigir depois. Mais barato.', en: 'Doing it right the first time, instead of inspecting and fixing later. Cheaper.' } },
    { term: 'Cost of quality', definition: { pt: 'Prevenção + avaliação + falha (interna/externa). Prevenir é mais barato que a falha externa (recall).', en: 'Prevention + appraisal + failure (internal/external). Preventing is cheaper than external failure (recall).' } },
    { term: 'Inspection', definition: { pt: 'Nível 1: checagem retrospectiva do produto acabado.', en: 'Level 1: retrospective checking of the finished product.' } },
    { term: 'QC (Quality Control)', definition: { pt: 'Sistema para detectar defeitos (auto-inspeção, teste de produto).', en: 'A system to detect defects (self-inspection, product testing).' } },
    { term: 'QA (Quality Assurance)', definition: { pt: 'Sistema proativo para prevenir o defeito antes que aconteça.', en: 'A proactive system to prevent the defect before it happens.' } },
    { term: 'TQM', definition: { pt: 'Total Quality Management: todos, em todos os níveis, se responsabilizam pela qualidade.', en: 'Total Quality Management: everyone, at all levels, takes responsibility for quality.' } },
    { term: 'Six Sigma', definition: { pt: 'Método estatístico: 3,4 defeitos por milhão. Usa o ciclo DMAIC.', en: 'Statistical method: 3.4 defects per million. Uses the DMAIC cycle.' } },
    { term: 'DMAIC', definition: { pt: 'Define, Measure, Analyze, Improve, Control — o ciclo do Six Sigma (extensão do PDCA).', en: 'Define, Measure, Analyze, Improve, Control — the Six Sigma cycle (extension of PDCA).' } },
    { term: 'PDCA', definition: { pt: 'Plan-Do-Check-Act: ciclo de melhoria contínua de Deming/Shewhart.', en: 'Plan-Do-Check-Act: Deming/Shewhart continuous improvement cycle.' } },
    { term: '7 Tools of Quality', definition: { pt: 'Fluxograma, folha de verificação, histograma, Pareto, dispersão, causa-efeito (Ishikawa), gráfico de controle.', en: 'Flow chart, check sheet, histogram, Pareto, scatter, cause-effect (Ishikawa), control chart.' } },
    { term: 'Fishbone / Ishikawa', definition: { pt: 'Diagrama de causa-e-efeito em forma de espinha de peixe: organiza as causas-raiz de um problema.', en: 'Cause-and-effect diagram shaped like a fish skeleton: organizes the root causes of a problem.' } },
    { term: 'Pareto diagram', definition: { pt: 'Barras ordenadas mostrando o 80/20: poucas causas geram a maioria dos problemas.', en: 'Ordered bars showing the 80/20: a few causes generate most problems.' } },
    { term: 'SPC', definition: { pt: 'Statistical Process Control: monitora o processo e sinaliza variação inesperada (causa especial).', en: 'Statistical Process Control: monitors the process and flags unexpected variation (special cause).' } },
    { term: 'Common vs special cause', definition: { pt: 'Causa comum = variação normal do processo. Causa especial = algo mudou, investigar.', en: 'Common cause = normal process variation. Special cause = something changed, investigate.' } },
    { term: 'UCL / LCL', definition: { pt: 'Upper/Lower Control Limit: limites do gráfico de controle. Estourar = sinal de causa especial.', en: 'Upper/Lower Control Limit: the control chart limits. Breaching = a special-cause signal.' } },
    { term: 'Process capability', definition: { pt: 'Quanto o processo consegue produzir consistentemente dentro da especificação.', en: 'How well the process can consistently produce within specification.' } },
    { term: 'Deming Prize / EFQM / Baldrige', definition: { pt: 'Prêmios de qualidade: Japão (Deming), Europa (EFQM), EUA (Malcolm Baldrige).', en: 'Quality awards: Japan (Deming), Europe (EFQM), USA (Malcolm Baldrige).' } }
  ],
  connections: [
    { week: 8, reason: { pt: 'A qualidade é a FUNDAÇÃO do lean (Semana 8, cone de areia): sem consistência sem erros, o just-in-time não funciona.', en: 'Quality is the FOUNDATION of lean (Week 8, sand cone): without consistency with no errors, just-in-time doesn\'t work.' } },
    { week: 9, reason: { pt: 'O kaizen (melhoria contínua) e o PDCA conectam qualidade com a filosofia de melhoria vista no lean.', en: 'Kaizen (continuous improvement) and PDCA connect quality with the improvement philosophy seen in lean.' } },
    { week: 4, reason: { pt: 'O SPC e o gráfico de controle monitoram os processos desenhados no Design de Processos (Semana 4).', en: 'SPC and the control chart monitor the processes designed in Process Design (Week 4).' } },
    { week: 10, reason: { pt: 'A Semana 10 (Futuro) fecha o curso: novas tecnologias (Indústria 4.0) vão transformar como a qualidade é medida e controlada.', en: 'Week 10 (Future) closes the course: new technologies (Industry 4.0) will transform how quality is measured and controlled.' } }
  ],
  flashcards: [
    { q: { pt: 'O que é qualidade em termos de GESTÃO (não do dia a dia)?', en: 'What is quality in MANAGEMENT terms (not everyday)?' }, a: { pt: 'Consistência, confiabilidade e conformidade com a especificação — fazer sempre exatamente igual, controlado e repetível. NÃO é luxo/exclusividade (Rolex).', en: 'Consistency, reliability and conformance to specification — always doing exactly the same, controlled and repeatable. NOT luxury/exclusivity (Rolex).' } },
    { q: { pt: 'Por que a qualidade em serviços é diferente da qualidade em produtos?', en: 'Why is service quality different from product quality?' }, a: { pt: 'Em produtos há especificações e dimensões mensuráveis. Em serviços, o CLIENTE define a qualidade (a mesma experiência agrada um e desagrada outro) — mede-se pelas 5 dimensões do SERVQUAL (RATER).', en: 'Products have measurable specs and dimensions. In services, the CUSTOMER defines quality (the same experience pleases one and displeases another) — measured by SERVQUAL\'s 5 dimensions (RATER).' } },
    { q: { pt: 'Cite as 8 dimensões de qualidade de Garvin.', en: 'Name Garvin\'s 8 dimensions of quality.' }, a: { pt: 'Desempenho, características, confiabilidade, conformidade, durabilidade, atendibilidade (serviceability), estética e qualidade percebida.', en: 'Performance, features, reliability, conformance, durability, serviceability, aesthetics and perceived quality.' } },
    { q: { pt: 'Quem são os 4 principais gurus da qualidade e uma ideia de cada?', en: 'Who are the 4 main quality gurus and one idea from each?' }, a: { pt: 'Deming (PDCA, gestão responsável, SPC), Juran (fitness for use), Crosby (zero defeitos, "quality is free"), Feigenbaum (Total Quality Control). + Ishikawa (fishbone, 7 tools).', en: 'Deming (PDCA, responsible management, SPC), Juran (fitness for use), Crosby (zero defects, "quality is free"), Feigenbaum (Total Quality Control). + Ishikawa (fishbone, 7 tools).' } },
    { q: { pt: 'Quais os 6 níveis da evolução da qualidade (Figura 13.4)?', en: 'What are the 6 levels of quality evolution (Figure 13.4)?' }, a: { pt: 'Inspeção → Controle de Qualidade (QC) → Garantia da Qualidade (QA) → TQM → Six Sigma → Lean Six Sigma. Cada nível ENGLOBA o anterior.', en: 'Inspection → Quality Control (QC) → Quality Assurance (QA) → TQM → Six Sigma → Lean Six Sigma. Each level SUBSUMES the previous.' } },
    { q: { pt: 'O que significa "Six Sigma" em números, e qual ciclo usa?', en: 'What does "Six Sigma" mean in numbers, and which cycle does it use?' }, a: { pt: 'Apenas 3,4 defeitos por milhão de oportunidades. Usa o ciclo DMAIC (Define, Measure, Analyze, Improve, Control), uma extensão do PDCA de Deming.', en: 'Only 3.4 defects per million opportunities. It uses the DMAIC cycle (Define, Measure, Analyze, Improve, Control), an extension of Deming\'s PDCA.' } },
    { q: { pt: 'Cite os 7 tools da qualidade.', en: 'Name the 7 tools of quality.' }, a: { pt: 'Fluxograma, folha de verificação, histograma, diagrama de Pareto, diagrama de dispersão, diagrama de causa-e-efeito (Ishikawa/espinha de peixe) e gráfico de controle.', en: 'Flow chart, check sheet, histogram, Pareto diagram, scatter diagram, cause-and-effect (Ishikawa/fishbone) diagram and control chart.' } },
    { q: { pt: 'No SPC, qual a diferença entre causa comum e causa especial?', en: 'In SPC, what is the difference between common and special cause?' }, a: { pt: 'Causa comum = variação NORMAL do processo (dentro dos limites de controle). Causa especial = variação INESPERADA (estoura um limite ou forma padrão suspeito) — algo mudou, precisa investigar.', en: 'Common cause = NORMAL process variation (within control limits). Special cause = UNEXPECTED variation (breaches a limit or forms a suspicious pattern) — something changed, investigate.' } },
    { q: { pt: 'Por que "certo da primeira vez" (right first time) é mais barato?', en: 'Why is "right first time" cheaper?' }, a: { pt: 'Porque o custo de falha externa (consertar no cliente, recall — caso Tesla) é muito maior que o de prevenção (fazer certo na fábrica). Prevenir < corrigir depois.', en: 'Because the external failure cost (fixing at the customer, recall — Tesla case) is far higher than prevention (making it right in the factory). Prevent < fix later.' } },
    { q: { pt: 'O que o gráfico de controle mostra e para que serve?', en: 'What does the control chart show and what is it for?' }, a: { pt: 'Plota as medições do processo no tempo com média + limites (UCL/LCL). Serve para detectar rapidamente quando o processo saiu do padrão (ponto fora dos limites = causa especial), sem esperar o produto final.', en: 'It plots process measurements over time with a mean + limits (UCL/LCL). It detects quickly when the process has drifted (a point outside the limits = special cause), without waiting for the final product.' } }
  ],
  links: [
    { title: 'Elon Musk admits Tesla has quality problems (Isidore, CNN Business 2021)', url: 'https://www.cnn.com/business', type: 'news', description: { pt: 'A Tesla e seus problemas de qualidade — o custo de consertar depois vs certo da primeira vez.', en: 'Tesla and its quality problems — the cost of fixing later vs right first time.' } },
    { title: 'How to measure the 5 dimensions of service quality (SurveyMonkey)', url: 'https://www.surveymonkey.com/', type: 'article', description: { pt: 'As 5 dimensões da qualidade em serviços (SERVQUAL/RATER) e como medi-las.', en: 'The 5 dimensions of service quality (SERVQUAL/RATER) and how to measure them.' } },
    { title: 'A guide to quality assurance (Indeed, 2022)', url: 'https://www.indeed.com/career-advice', type: 'article', description: { pt: 'O papel do gestor de qualidade (quality manager) e as funções de QA — uma possível carreira.', en: 'The quality manager role and QA functions — a possible career.' } },
    { title: 'What is statistical process control (SPC)? (Katana, 2022)', url: 'https://katanamrp.com/', type: 'article', description: { pt: 'O que é SPC e como monitora processos, sinalizando variação inesperada.', en: 'What SPC is and how it monitors processes, flagging unexpected variation.' } },
    { title: 'Competing on the eight dimensions of quality (Garvin, HBR 1987)', url: 'https://hbr.org/1987/11/competing-on-the-eight-dimensions-of-quality', type: 'article', description: { pt: 'O artigo seminal de Garvin sobre as 8 dimensões da qualidade (leitura complementar).', en: 'Garvin\'s seminal article on the 8 dimensions of quality (further reading).' } }
  ],
  notes: {
    pt: `═══ VISÃO GERAL ═══
Qualidade é a fundação de tudo (cone de areia, Semana 8). Em GESTÃO, qualidade ≠ luxo/percepção de caro (Rolex). É consistência, confiabilidade e conformidade com a especificação — fazer sempre igual, controlado, repetível. Prof. Pilkington: reliability, consistency, conforming to standard.

═══ DEFININDO QUALIDADE: GARVIN (pp.426-439) ═══
Garvin (1987), 5 abordagens: transcendente (excelência inata), baseada no produto, no usuário, no valor, na manufatura (conformidade à spec — a mais útil p/ operações).
8 dimensões (exemplos num carro): desempenho, características, confiabilidade, conformidade, durabilidade, atendibilidade (serviceability), estética, qualidade percebida (Apple = alumínio pesado, "sensação de qualidade").

═══ QUALIDADE EM SERVIÇOS (o cliente define) ═══
Em produtos: specs e dimensões mensuráveis. Em serviços: o CLIENTE define (exemplo do banco: mesma experiência, percepções opostas). 5 dimensões SERVQUAL (RATER): Reliability, Assurance, Tangibles, Empathy, Responsiveness. Modelo de gaps: brechas entre expectativa e entrega.

═══ OS GURUS DA QUALIDADE ═══
• Deming — pedra angular; qualidade = satisfazer o cliente; responsabilidade da GESTÃO; ciclo PDCA (plan-do-check-act); SPC; 14 princípios. Prêmio Deming.
• Juran — "fitness for use" (adequação ao uso); começa por quem/como/por que usa.
• Crosby — "zero defeitos", "certo da primeira vez", "quality is free" (a NÃO-qualidade é que custa caro).
• Feigenbaum — Total Quality Control (qualidade é de toda a organização).
• Ishikawa — diagrama espinha de peixe + os 7 tools (qualidade acessível a todos).

═══ EVOLUÇÃO DA QUALIDADE (Figura 13.4, pp.439-447) ═══
6 níveis aninhados, cada um ENGLOBANDO o anterior:
Inspeção (checar produto pronto) → QC/Controle de Qualidade (detectar defeitos) → QA/Garantia (proativo, prevenir) → TQM/Gestão da Qualidade Total (todos, todos os níveis) → Six Sigma (estatístico, 3,4 defeitos/milhão, ciclo DMAIC) → Lean Six Sigma (lean + Six Sigma).
A grande virada: de "checar produto pronto" para "construir sistemas que não erram".
Zero defeitos + certo da primeira vez = eficiência. Custo da qualidade: prevenção < falha externa (Tesla/recall).

═══ OS 7 TOOLS DA QUALIDADE + SPC (pp.448-464) ═══
7 ferramentas simples/visuais que qualquer um usa (Ishikawa): Fluxograma, Folha de verificação, Histograma, Diagrama de Pareto (80/20), Diagrama de dispersão (correlação), Causa-e-efeito/espinha de peixe, Gráfico de controle.
SPC (controle estatístico de processo): mede o processo no tempo e sinaliza quando a variação é INESPERADA (causa especial) vs normal (causa comum). Gráfico de controle: média + limites UCL/LCL; ponto fora = investigar. Detecta desvios rápido, sem esperar o produto final. (Não precisa dominar a matemática — basta a ideia.) Capacidade de processo: quanto o processo produz dentro da spec.

═══ PRÊMIOS DE QUALIDADE ═══
Prêmio Deming (Japão), EFQM (Europa), Malcolm Baldrige (EUA) — cada um com critérios de excelência em qualidade.

═══ RESUMO DA SEMANA ═══
Examinamos um aspecto crítico: garantir que tudo aconteça de forma consistente e controlada. Vimos os gurus, "zero defeitos" e "certo da primeira vez" (levam a sistemas eficientes/eficazes), e ferramentas (capacidade de processo, os 7 tools) muito adotadas para controlar o próprio desempenho. Próxima e última semana: o futuro e as tecnologias emergentes da gestão de operações.

═══ FONTES ═══

📖 Ebook — EBOOK_ Operations Management 2_e.pdf (Paton, Clegg, Hsuan & Pilkington), Capítulo 13
   → pp. 426–439 (Definir qualidade: contribuição p/ lucro Fig. 13.1; abordagens e 8 dimensões de Garvin Tab. 13.1; qualidade em serviços — 5 dimensões + modelo de gaps Fig. 13.2)
   → pp. 439–447 (Os gurus: Deming/PDCA Fig. 13.3, Juran, Crosby/zero defeitos, Feigenbaum; evolução Inspeção→QC→QA→TQM→Six Sigma→LSS Fig. 13.4 + Tab. 13.2; DMAIC Fig. 13.5; EFQM Fig. 13.6)
   → pp. 448–464 (Os 7 tools: fluxograma Fig. 13.8, histograma Fig. 13.9, Pareto Fig. 13.10, dispersão Fig. 13.11, causa-efeito/Ishikawa Fig. 13.12, run/control chart Fig. 13.13; SPC + distribuição normal Figs. 13.19/13.20; FMEA, QFD)

📊 Figura 13.4 (evolução aninhada) — lida como imagem, base para a visualização "Evolução da Qualidade" (qualityEvolution)
📊 Tabela 13.1 / Garvin (8 dimensões) — base para a visualização "Dimensões de Garvin" (qualityDimensions)
📊 Figuras 13.8–13.13 (os 7 tools) — base para a visualização "Os 7 Tools" (sevenTools)
📊 SPC / gráfico de controle (p.977) — base para a visualização "Gráfico de Controle" (spcChart)

🎬 Materiais do curso (Coursera, Week 9): aula do prof. Pilkington (definir qualidade = consistência/confiabilidade/conformidade); Tesla (Loveday, Inside EVs 2021; Isidore, CNN 2021; J.D. Power IQS 2022); service quality (SurveyMonkey 5 dimensões; Kellogg\'s/GFSI); Deming Prize/EFQM/Baldrige; quality jobs (Indeed 2022); SPC (Safefood 360; Katana 2022). Further reading: Garvin (HBR 1987); Pepper & Spedding (2010, lean Six Sigma).

📝 Conteúdo estruturado a partir das telas do curso + transcrição da aula do prof. Pilkington enviadas pelo usuário + leitura do ebook (Capítulo 13, pp. 426–464).`,
    en: `═══ OVERVIEW ═══
Quality is the foundation of everything (sand cone, Week 8). In MANAGEMENT, quality ≠ luxury/expensive perception (Rolex). It is consistency, reliability and conformance to specification — always doing the same, controlled, repeatable. Prof. Pilkington: reliability, consistency, conforming to standard.

═══ DEFINING QUALITY: GARVIN (pp.426-439) ═══
Garvin (1987), 5 approaches: transcendent (innate excellence), product-based, user-based, value-based, manufacturing-based (conformance to spec — the most useful for operations).
8 dimensions (examples in a car): performance, features, reliability, conformance, durability, serviceability, aesthetics, perceived quality (Apple = heavy aluminium, a "quality feel").

═══ SERVICE QUALITY (the customer defines it) ═══
Products: measurable specs and dimensions. Services: the CUSTOMER defines it (the bank example: same experience, opposite perceptions). SERVQUAL 5 dimensions (RATER): Reliability, Assurance, Tangibles, Empathy, Responsiveness. Gaps model: gaps between expectation and delivery.

═══ THE QUALITY GURUS ═══
• Deming — cornerstone; quality = satisfy the customer; MANAGEMENT\'s responsibility; PDCA cycle (plan-do-check-act); SPC; 14 principles. Deming Prize.
• Juran — "fitness for use"; starts from who/how/why uses it.
• Crosby — "zero defects", "right first time", "quality is free" (it is NON-quality that costs).
• Feigenbaum — Total Quality Control (quality is the whole organization\'s).
• Ishikawa — fishbone diagram + the 7 tools (quality accessible to all).

═══ EVOLUTION OF QUALITY (Figure 13.4, pp.439-447) ═══
6 nested levels, each SUBSUMING the previous:
Inspection (check finished product) → QC/Quality Control (detect defects) → QA/Quality Assurance (proactive, prevent) → TQM/Total Quality Management (everyone, all levels) → Six Sigma (statistical, 3.4 defects/million, DMAIC cycle) → Lean Six Sigma (lean + Six Sigma).
The big turn: from "check the finished product" to "build systems that don\'t err".
Zero defects + right first time = efficiency. Cost of quality: prevention < external failure (Tesla/recall).

═══ THE 7 TOOLS OF QUALITY + SPC (pp.448-464) ═══
7 simple/visual tools anyone uses (Ishikawa): Flow chart, Check sheet, Histogram, Pareto diagram (80/20), Scatter diagram (correlation), Cause-and-effect/fishbone, Control chart.
SPC (statistical process control): measures the process over time and flags when variation is UNEXPECTED (special cause) vs normal (common cause). Control chart: mean + UCL/LCL limits; a point outside = investigate. It detects drift fast, without waiting for the final product. (No need to master the maths — just the idea.) Process capability: how well the process produces within spec.

═══ QUALITY AWARDS ═══
Deming Prize (Japan), EFQM (Europe), Malcolm Baldrige (USA) — each with its criteria for quality excellence.

═══ WEEK SUMMARY ═══
We examined a critical aspect: ensuring everything happens in a consistent, controlled way. We saw the gurus, "zero defects" and "right first time" (leading to efficient/effective systems), and tools (process capability, the 7 tools) widely adopted to control one\'s own performance. Next and last week: the future and emerging technologies of operations management.

═══ SOURCES ═══

📖 Ebook — EBOOK_ Operations Management 2_e.pdf (Paton, Clegg, Hsuan & Pilkington), Chapter 13
   → pp. 426–439 (Defining quality: contribution to profit Fig. 13.1; Garvin\'s approaches and 8 dimensions Tab. 13.1; service quality — 5 dimensions + gaps model Fig. 13.2)
   → pp. 439–447 (The gurus: Deming/PDCA Fig. 13.3, Juran, Crosby/zero defects, Feigenbaum; evolution Inspection→QC→QA→TQM→Six Sigma→LSS Fig. 13.4 + Tab. 13.2; DMAIC Fig. 13.5; EFQM Fig. 13.6)
   → pp. 448–464 (The 7 tools: flow chart Fig. 13.8, histogram Fig. 13.9, Pareto Fig. 13.10, scatter Fig. 13.11, cause-effect/Ishikawa Fig. 13.12, run/control chart Fig. 13.13; SPC + normal distribution Figs. 13.19/13.20; FMEA, QFD)

📊 Figure 13.4 (nested evolution) — read as an image, basis for the "Evolution of Quality" visualization (qualityEvolution)
📊 Table 13.1 / Garvin (8 dimensions) — basis for the "Garvin\'s Dimensions" visualization (qualityDimensions)
📊 Figures 13.8–13.13 (the 7 tools) — basis for the "The 7 Tools" visualization (sevenTools)
📊 SPC / control chart (p.977) — basis for the "Control Chart" visualization (spcChart)

🎬 Course materials (Coursera, Week 9): Prof. Pilkington\'s class (defining quality = consistency/reliability/conformance); Tesla (Loveday, Inside EVs 2021; Isidore, CNN 2021; J.D. Power IQS 2022); service quality (SurveyMonkey 5 dimensions; Kellogg\'s/GFSI); Deming Prize/EFQM/Baldrige; quality jobs (Indeed 2022); SPC (Safefood 360; Katana 2022). Further reading: Garvin (HBR 1987); Pepper & Spedding (2010, lean Six Sigma).

📝 Content structured from the course screens + Prof. Pilkington\'s class transcript sent by the user + ebook reading (Chapter 13, pp. 426–464).`
  }
};
