window.WEEKS_DATA = window.WEEKS_DATA || {};
window.WEEKS_DATA['operations-management'] = window.WEEKS_DATA['operations-management'] || {};
window.WEEKS_DATA['operations-management'][4] = {
  week: 4,
  status: 'done',
  title: { pt: 'Design de Processos', en: 'Process Design' },
  overview: {
    pt: 'Todo produto ou serviço nasce de um processo. O design de processos responde à pergunta: como transformar inputs em outputs de forma eficiente e eficaz? Esta semana conecta três decisões estratégicas — tipo de processo, tipo de pedido e tipo de layout — e apresenta ferramentas de mapeamento como o Value Stream Map (VSM).',
    en: 'Every product or service is created by a process. Process design answers: how do we transform inputs into outputs efficiently and effectively? This week connects three strategic decisions — process type, order type, and layout type — and introduces mapping tools like the Value Stream Map (VSM).'
  },
  concepts: [
    {
      pt: 'Pensamento Sistêmico',
      en: 'Systems Thinking',
      definition: {
        pt: 'Abordagem holística que analisa um sistema como um todo integrado — elementos, relacionamentos, fronteira, loops de feedback e ambiente — em vez de estudar partes isoladas.',
        en: 'Holistic approach that analyses a system as an integrated whole — elements, relationships, boundary, feedback loops, and environment — rather than studying isolated parts.'
      }
    },
    {
      pt: 'Holismo vs. Reducionismo',
      en: 'Holism vs. Reductionism',
      definition: {
        pt: 'Holismo: o todo é maior que a soma das partes. Reducionismo: entender o todo dividindo em partes menores. Em operações, o pensamento holístico é preferido porque otimizar partes isoladas pode piorar o sistema inteiro.',
        en: 'Holism: the whole is greater than the sum of its parts. Reductionism: understanding the whole by breaking it down. In operations, holistic thinking is preferred — optimizing isolated parts can worsen the whole system.'
      }
    },
    {
      pt: 'Tipos de Processo',
      en: 'Process Types',
      definition: {
        pt: 'As cinco categorias que descrevem como um processo é organizado: Contínuo, Linha de Montagem, Lote (Batch), Oficina (Job Shop) e Projeto. Cada tipo se encaixa numa combinação específica de volume e variedade.',
        en: 'Five categories describing how a process is organized: Continuous, Assembly Line, Batch, Job Shop, and Project. Each fits a specific volume-variety combination.'
      }
    },
    {
      pt: 'Modelo Volume-Variedade',
      en: 'Volume-Variety Model',
      definition: {
        pt: 'Princípio central de design de processos: operações eficientes ficam na diagonal onde alto volume = baixa variedade e vice-versa. Processos fora da diagonal são economicamente inviáveis.',
        en: 'Central process design principle: efficient operations sit on the diagonal where high volume = low variety and vice versa. Processes off the diagonal are economically unviable.'
      }
    },
    {
      pt: 'Tipo de Pedido',
      en: 'Order Type',
      definition: {
        pt: 'Como uma empresa decide produzir em resposta à demanda: Fabricar para Estoque (MTS), Montar sob Pedido (ATO) ou Fabricar sob Pedido (MTO). Define o ponto de customização na cadeia produtiva.',
        en: 'How a company decides to produce in response to demand: Make to Stock (MTS), Assemble to Order (ATO), or Make to Order (MTO). Defines the customization point in the production chain.'
      }
    },
    {
      pt: 'Ponto de Customização',
      en: 'Customization Point',
      definition: {
        pt: 'O momento na cadeia de produção em que o produto ou serviço deixa de ser genérico e passa a ser específico para o cliente. Em MTS: no início; em ATO: na montagem; em MTO: na concepção.',
        en: 'The point in the production chain where the product shifts from generic to customer-specific. In MTS: at the start; in ATO: at assembly; in MTO: at conception.'
      }
    },
    {
      pt: 'Mapeamento de Processos',
      en: 'Process Mapping',
      definition: {
        pt: 'Conjunto de técnicas visuais para representar como um processo funciona: Diagrama de Fluxo, Swim Lane, Gráfico de Processo, Blueprint de Serviço e Mapa de Fluxo de Valor (VSM).',
        en: 'Set of visual techniques to represent how a process works: Flow Diagram, Swim Lane Map, Process Chart, Service Blueprint, and Value Stream Map (VSM).'
      }
    },
    {
      pt: 'Mapa de Fluxo de Valor (VSM)',
      en: 'Value Stream Map (VSM)',
      definition: {
        pt: 'Ferramenta lean que mapeia o estado atual de um processo (com todas as ineficiências) e propõe um estado futuro mais enxuto. Mostra fluxos de materiais e informações, tempos de ciclo e tempo de espera.',
        en: 'Lean tool mapping the current state of a process (with all inefficiencies) and proposing a leaner future state. Shows material and information flows, cycle times, and waiting times.'
      }
    },
    {
      pt: 'Tempo de Ciclo',
      en: 'Cycle Time',
      definition: {
        pt: 'Tempo real que um processo ou tarefa leva para produzir uma unidade de output. Também chamado de processing time. Usado no VSM para calcular o lead time total.',
        en: 'The actual time a process or task takes to produce one unit of output. Also called processing time. Used in VSM to calculate total lead time.'
      }
    },
    {
      pt: 'Takt Time',
      en: 'Takt Time',
      definition: {
        pt: 'Ritmo de produção exigido pelo cliente — tempo disponível por unidade de output. Fórmula: Takt time = OEE ÷ Demanda média. É o "metrônomo" da operação, definido pelo cliente.',
        en: 'Production rhythm required by the customer — time allowed per unit of output. Formula: Takt time = OEE ÷ Average demand. The "metronome" of the operation, set by the customer.'
      }
    },
    {
      pt: 'Layout Físico',
      en: 'Physical Layout',
      definition: {
        pt: 'Configuração física de departamentos, centros de trabalho, máquinas e equipamentos numa operação. Influencia diretamente a capacidade, flexibilidade, custo e qualidade do processo.',
        en: 'Physical configuration of departments, work centres, machines, and equipment. Directly influences capacity, flexibility, cost, and quality of the process.'
      }
    },
    {
      pt: 'Layout de Posição Fixa',
      en: 'Fixed Position Layout',
      definition: {
        pt: 'Layout onde o produto permanece estacionário e trabalhadores, materiais e equipamentos se movem ao redor dele. Usado em grandes projetos: navios, aviões, edifícios, cirurgias.',
        en: 'Layout where the product stays stationary and workers, materials, and equipment move around it. Used in large-scale projects: ships, aircraft, buildings, surgeries.'
      }
    },
    {
      pt: 'Layout Dominado por Produto-Serviço',
      en: 'Product-Service-Dominant Layout',
      definition: {
        pt: 'Layout projetado para fluxo rápido e contínuo de um produto ou serviço específico, como linhas de montagem. Alta padronização, baixo custo unitário, pouca flexibilidade.',
        en: 'Layout designed for rapid, continuous flow of a specific product or service, like assembly lines. High standardization, low unit cost, little flexibility.'
      }
    },
    {
      pt: 'Layout Dominado por Processo',
      en: 'Process-Dominant Layout',
      definition: {
        pt: 'Layout organizado por tipo de função ou departamento. Processa alta variedade de produtos com diferentes rotas. Exemplo: hospitais, IKEA, oficinas de máquinas.',
        en: 'Layout organized by type of function or department. Processes high variety of products with different routes. Example: hospitals, IKEA, machine shops.'
      }
    },
    {
      pt: 'Layout de Célula de Trabalho',
      en: 'Work Cell Layout',
      definition: {
        pt: 'Layout híbrido que reúne pessoas e máquinas numa célula dedicada a uma família de produtos. Formato reto ou em U. Reduz WIP, melhora fluxo e moral dos funcionários.',
        en: 'Hybrid layout grouping people and machines in a cell dedicated to a product family. Straight or U-shaped format. Reduces WIP, improves flow and employee morale.'
      }
    },
    {
      pt: 'Customização em Massa',
      en: 'Mass Customization',
      definition: {
        pt: 'Combinação de alta variedade com alto volume, viabilizada por tecnologia e processos flexíveis (FMS, CIM). Permite produzir produtos customizados a custo de produção em massa. Exemplos: Dell, Deliveroo.',
        en: 'Combination of high variety with high volume, enabled by flexible technology (FMS, CIM). Allows producing customized products at mass-production cost. Examples: Dell, Deliveroo.'
      }
    },
    {
      pt: 'Lei de Little',
      en: "Little's Law",
      definition: {
        pt: 'Equação fundamental de fluxo: Tempo total de throughput = Nº de itens em andamento (WIP) × Tempo de ciclo por item. Reduzir WIP reduz o lead time proporcionalmente.',
        en: "Fundamental flow equation: Total throughput time = No. of work-in-progress items (WIP) × Item cycle time. Reducing WIP reduces lead time proportionally."
      }
    },
    {
      pt: 'Blueprint de Serviço',
      en: 'Service Blueprint',
      definition: {
        pt: 'Técnica de mapeamento de processos de serviço (Shostack, 1984) que separa: evidência física, ações do cliente, interações front-stage (visíveis), back-stage (invisíveis) e processos de suporte.',
        en: 'Service process mapping technique (Shostack, 1984) separating: physical evidence, customer actions, front-stage (visible), back-stage (invisible) interactions, and support processes.'
      }
    }
  ],
  theories: [
    {
      name: { pt: 'Pensamento Sistêmico em Operações', en: 'Systems Thinking in Operations' },
      authors: ['Peter Checkland'],
      year: '1981',
      description: {
        pt: 'Um sistema é um todo complexo cujo funcionamento depende de suas partes e das interações entre elas. Todo processo de negócio é um sistema com cinco elementos: (1) Elementos — máquinas, pessoas, materiais; (2) Relacionamentos — como interagem; (3) Fronteira — o que está dentro e fora; (4) Loops de feedback — auto-regulação; (5) Ambiente — fatores externos. O pensamento sistêmico exige perspectiva holística: o valor total é maior que a soma das partes. Otimizar departamentos isoladamente (reducionismo) causa sub-otimização do sistema inteiro.',
        en: 'A system is a complex whole whose functioning depends on its parts and interactions. Every business process has five elements: (1) Elements — machines, people, materials; (2) Relationships — how they interact; (3) Boundary — inside/outside; (4) Feedback loops — self-regulation; (5) Environment — external factors. Systems thinking demands a holistic view: total value is greater than the sum of parts. Optimizing departments in isolation (reductionism) causes whole-system sub-optimization.'
      }
    },
    {
      name: { pt: 'Os 5 Tipos de Processo', en: 'The 5 Process Types' },
      authors: ['Hayes', 'Wheelwright'],
      year: '1979',
      renderer: 'processTypes',
      description: {
        pt: 'Todo processo de operações se posiciona numa diagonal Volume-Variedade. Quanto maior o volume, menor a variedade eficiente. Os 5 tipos são: (1) Projeto — único, grande escala, posição fixa, MTO; (2) Oficina (Job Shop) — customizado, alta habilidade, MTO; (3) Lote (Batch) — lotes semi-flexíveis, MTO/ATO; (4) Linha de Montagem — produtos discretos, alto volume, ATO/MTS; (5) Contínuo — 24h, altamente automatizado, MTS. Processos fora da diagonal são inviáveis: alto volume + alta variedade = custo proibitivo; baixo volume + baixa variedade = escala insuficiente.',
        en: 'Every operations process sits on a Volume-Variety diagonal. The higher the volume, the lower the efficient variety. The 5 types are: (1) Project — unique, large-scale, fixed position, MTO; (2) Job Shop — customized, high skill, MTO; (3) Batch — semi-flexible lots, MTO/ATO; (4) Assembly Line — discrete products, high volume, ATO/MTS; (5) Continuous — 24h, highly automated, MTS. Processes off the diagonal are unviable: high volume + high variety = prohibitive cost; low volume + low variety = insufficient scale.'
      }
    },
    {
      name: { pt: 'Tipos de Pedido e Ponto de Customização', en: 'Order Types and Customization Point' },
      authors: ['Paton', 'Clegg', 'Hsuan', 'Pilkington'],
      year: '2011',
      renderer: 'orderTypes',
      description: {
        pt: 'Três estratégias para responder à demanda definem o ponto de customização: (1) Fabricar para Estoque (MTS) — produzir antes do pedido com base em previsão. Alta disponibilidade, zero customização. Ex: supermercado. (2) Montar sob Pedido (ATO) — componentes padrão em estoque, montagem após pedido. Ex: Dell, Tesla. (3) Fabricar sob Pedido (MTO) — produção começa do zero após o pedido. Máxima customização, maior lead time. Ex: Läderach, obra civil. O ponto de customização é onde a produção deixa de ser genérica e passa a ser específica para o cliente.',
        en: 'Three demand-response strategies define the customization point: (1) Make to Stock (MTS) — produce before the order based on forecast. High availability, zero customization. Ex: supermarket. (2) Assemble to Order (ATO) — standard components in stock, assembled after order. Ex: Dell, Tesla. (3) Make to Order (MTO) — production starts from scratch after order. Maximum customization, longer lead time. Ex: Läderach, civil construction. The customization point is where production shifts from generic to customer-specific.'
      }
    },
    {
      name: { pt: 'Ferramentas de Mapeamento de Processos', en: 'Process Mapping Tools' },
      authors: ['Shostack'],
      year: '1984',
      renderer: 'processMappingTools',
      description: {
        pt: 'Cinco ferramentas visuais para analisar e melhorar processos: (1) Diagrama de Fluxo — sequência lógica com inputs e outputs; (2) Swim Lane — adiciona responsabilidade (eixo Y) e tempo (eixo X), revelando hand-offs; (3) Gráfico de Processo — tabela padronizada com 5 símbolos; (4) Blueprint de Serviço (Shostack, 1984) — separa front-stage e back-stage; (5) VSM — mais sofisticado, mostra estado atual e futuro com métricas lean. Escolha a ferramenta conforme o objetivo: lean → VSM; serviços → Blueprint; hand-offs → Swim Lane.',
        en: 'Five visual tools for analysing and improving processes: (1) Flow Diagram — logical sequence with inputs and outputs; (2) Swim Lane — adds responsibility (Y axis) and time (X axis), revealing hand-offs; (3) Process Chart — standardized table with 5 symbols; (4) Service Blueprint (Shostack, 1984) — separates front-stage and back-stage; (5) VSM — most sophisticated, shows current and future state with lean metrics. Choose the tool to fit the goal: lean → VSM; services → Blueprint; hand-offs → Swim Lane.'
      }
    },
    {
      name: { pt: 'Mapa de Fluxo de Valor (VSM)', en: 'Value Stream Map (VSM)' },
      authors: ['Rother', 'Shook'],
      year: '1999',
      renderer: 'vsmConcept',
      description: {
        pt: 'Ferramenta lean para identificar e eliminar desperdício num processo. Requer dois mapas: Estado Atual — processo hoje com WIP acumulado e longos tempos de espera — e Estado Futuro — após eliminar desperdício via kanban, fluxo contínuo e células de trabalho. Elementos-chave: Takt time (ritmo do cliente), Tempo de ciclo (C/T), Tempo de espera (onde mora o desperdício), Tarefa marcapasso (define a velocidade do processo). Caso ACME: estado atual = 23,6 dias espera + 195s → estado futuro = 4,5 dias + 169s. Redução de 19,1 dias de desperdício.',
        en: 'Lean tool for identifying and eliminating process waste. Requires two maps: Current State — process today with accumulated WIP and long waiting times — and Future State — after eliminating waste via kanban, continuous flow and work cells. Key elements: Takt time (customer rhythm), Cycle time (C/T), Waiting time (where waste lives), Pacemaker task (sets process speed). ACME case: current state = 23.6 days waiting + 195s → future state = 4.5 days + 169s. 19.1 days of waste eliminated.'
      }
    },
    {
      name: { pt: 'Layouts Físicos de Processos', en: 'Physical Layouts of Processes' },
      authors: ['Paton', 'Clegg', 'Hsuan', 'Pilkington'],
      year: '2011',
      renderer: 'facilityLayouts',
      description: {
        pt: 'Quatro configurações básicas de layout físico: (1) Posição Fixa — produto estacionário, recursos se movem ao redor. Projetos grandes; (2) Dominado por Produto-Serviço — fluxo linear de alto volume. Baixo custo, pouca flexibilidade; (3) Dominado por Processo — organizado por função (departamentos). Alta variedade, roteamento complexo. Ex: IKEA, hospitais; (4) Célula de Trabalho — híbrido, máquinas em U ou linha reta para família de produtos. O layout errado pode gerar ineficiência, alto custo e má qualidade de vida no trabalho.',
        en: 'Four basic physical layout configurations: (1) Fixed Position — stationary product, resources move to it. Large-scale projects; (2) Product-Service Dominant — linear high-volume flow. Low cost, little flexibility; (3) Process-Dominant — organized by function (departments). High variety, complex routing. Ex: IKEA, hospitals; (4) Work Cell — hybrid, U-shaped or straight-line machines for a product family. The wrong layout leads to inefficiency, high cost and poor quality of working life.'
      }
    },
    {
      name: { pt: 'Tecnologia em Processos', en: 'Technology in Processes' },
      authors: ['Paton', 'Clegg', 'Hsuan', 'Pilkington'],
      year: '2011',
      description: {
        pt: 'Seis tecnologias de produção modernas: (1) Machine Technology — nano-máquinas a plataformas de hovering, 5× mais produtivas; (2) RFID — identificação por radiofrequência sem linha de visão (Jaguar Land Rover); (3) Controle de Processo — sensores que monitoram e ajustam em tempo real; (4) Sistemas de Visão — câmeras + IA para inspeção automatizada; (5) Robôs — tarefas repetitivas, perigosas ou de alta precisão (Toyota: soldagem); (6) FMS/CIM — sistemas integrados que viabilizam customização em massa. Serviços: self-check-in, ATMs, VLEs, sistemas de pedido sem fio.',
        en: 'Six modern production technologies: (1) Machine Technology — nano-machines to hovering platforms, 5× more productive; (2) RFID — radio frequency ID without line-of-sight (Jaguar Land Rover); (3) Process Control — sensors monitoring and adjusting in real time; (4) Vision Systems — cameras + AI for automated visual inspection; (5) Robots — repetitive, dangerous or high-precision tasks (Toyota: welding); (6) FMS/CIM — integrated systems enabling mass customization. Services: self-check-in, ATMs, VLEs, wireless ordering systems.'
      }
    }
  ],
  authors: [
    {
      name: 'Peter Checkland',
      role: { pt: 'Professor de Sistemas, Universidade de Lancaster', en: 'Systems Professor, Lancaster University' },
      contribution: {
        pt: 'Desenvolveu a Metodologia de Sistemas Soft (SSM) e popularizou o pensamento sistêmico em gestão. Seu livro Systems Thinking, Systems Practice (1981) é referência fundamental em operações.',
        en: 'Developed Soft Systems Methodology (SSM) and popularized systems thinking in management. His book Systems Thinking, Systems Practice (1981) is a fundamental operations reference.'
      }
    },
    {
      name: 'Robert H. Hayes & Steven C. Wheelwright',
      role: { pt: 'Professores de Gestão de Operações, Harvard Business School', en: 'Operations Management Professors, Harvard Business School' },
      contribution: {
        pt: 'Co-criaram o modelo Volume-Variedade (1979) que mapeia os 5 tipos de processo na diagonal. Hayes também desenvolveu o Modelo de 4 Estágios (Semana 2) de desenvolvimento estratégico de operações.',
        en: 'Co-created the Volume-Variety model (1979) mapping the 5 process types on the diagonal. Hayes also developed the 4-Stage Model (Week 2) for strategic operations development.'
      }
    },
    {
      name: 'G. Lynn Shostack',
      role: { pt: 'Executiva de Marketing, Bankers Trust', en: 'Marketing Executive, Bankers Trust' },
      contribution: {
        pt: 'Criou o Service Blueprint (1984), técnica de mapeamento de processos de serviço que separa evidência física, ações do cliente, interações front-stage, back-stage e processos de suporte.',
        en: 'Created the Service Blueprint (1984), separating physical evidence, customer actions, front-stage, back-stage interactions and support processes in service operations.'
      }
    },
    {
      name: 'Mike Rother & John Shook',
      role: { pt: 'Consultores Lean, Lean Enterprise Institute', en: 'Lean Consultants, Lean Enterprise Institute' },
      contribution: {
        pt: 'Sistematizaram o Value Stream Mapping (VSM) no livro Learning to See (1999), tornando-o a principal ferramenta de mapeamento lean. Basearam-se no Toyota Production System.',
        en: 'Systematized Value Stream Mapping (VSM) in Learning to See (1999), making it the main lean mapping tool. Based on the Toyota Production System.'
      }
    },
    {
      name: 'John D.C. Little',
      role: { pt: 'Professor de Ciência de Gestão, MIT', en: 'Management Science Professor, MIT' },
      contribution: {
        pt: 'Provou matematicamente a Lei de Little (1961): Throughput total = WIP × Tempo de ciclo. Equação universal aplicável a qualquer sistema de fila estável — de linhas de produção a filas de e-mail.',
        en: "Mathematically proved Little's Law (1961): Total throughput = WIP × Cycle time. A universal equation applicable to any stable queuing system — from production lines to email queues."
      }
    }
  ],
  caseStudies: [
    {
      company: 'Welcome Break',
      sector: { pt: 'Serviços de Estrada / Hospitalidade', en: 'Roadside Services / Hospitality' },
      lesson: {
        pt: 'Área de serviço que combina múltiplos processos num mesmo espaço: processo contínuo para combustível, linha de montagem para fast food, lote para restaurante e projeto para construções. Ilustra como diferentes tipos de processo coexistem numa única operação.',
        en: 'Service area combining multiple processes in the same space: continuous for fuel, assembly line for fast food, batch for the restaurant, and project for construction. Illustrates how different process types coexist in one operation.'
      }
    },
    {
      company: 'Dell',
      sector: { pt: 'Tecnologia / Manufatura', en: 'Technology / Manufacturing' },
      lesson: {
        pt: 'Pioneer do modelo Assemble to Order (ATO): componentes padrão em estoque, computadores montados após pedido online. Elimina estoque de produto acabado, permite customização e reduz lead time. Exemplo icônico de customização em massa viabilizada por tecnologia.',
        en: 'Pioneer of Assemble to Order (ATO): standard components in stock, computers assembled after online order. Eliminates finished goods inventory, enables customization, reduces lead time. Iconic example of mass customization enabled by technology.'
      }
    },
    {
      company: 'IKEA',
      sector: { pt: 'Varejo / Móveis', en: 'Retail / Furniture' },
      lesson: {
        pt: 'Exemplo clássico de layout dominado por processo: o layout força clientes a percorrer todos os departamentos incluindo o restaurante. Maximiza tempo de loja e exposição a produtos, gerando compras não planejadas. Flat-pack = Make to Stock.',
        en: 'Classic process-dominant layout: the layout forces customers through every department including the restaurant. Maximizes store time and product exposure, generating unplanned purchases. Flat-pack = Make to Stock.'
      }
    },
    {
      company: 'Läderach',
      sector: { pt: 'Confeitaria de Luxo / Chocolates Artesanais', en: 'Luxury Confectionery / Artisan Chocolates' },
      lesson: {
        pt: 'Chocolateiro suíço que opera no modelo Make to Order (MTO) para criações artesanais: cada pedido é único, feito à mão por chocolateiros especializados. Alto custo, máxima qualidade e customização. Posiciona-se na diagonal Project/Job Shop.',
        en: 'Swiss chocolatier operating on Make to Order (MTO): each order unique, hand-crafted by specialized chocolatiers. High cost, maximum quality and customization. Positioned on the Project/Job Shop diagonal.'
      }
    },
    {
      company: 'Tesla',
      sector: { pt: 'Automóveis Elétricos / Manufatura', en: 'Electric Vehicles / Manufacturing' },
      lesson: {
        pt: 'A Gigafactory combina linha de montagem com alta automação (robôs e FMS/CIM). Usa Assemble to Order (ATO): opções configuradas online, veículos montados após pedido. Exemplo de como tecnologia empurra o limite da diagonal Volume-Variedade.',
        en: 'Gigafactory combines assembly line with high automation (robots and FMS/CIM). Uses Assemble to Order (ATO): options configured online, vehicles assembled after order. Example of how technology pushes the Volume-Variety diagonal limit.'
      }
    },
    {
      company: 'ACME Company',
      sector: { pt: 'Manufatura / Peças para Tratores', en: 'Manufacturing / Tractor Parts' },
      lesson: {
        pt: 'Caso clássico de VSM: estado atual mostrava 23,6 dias de espera e apenas 195 segundos de processamento. Estado futuro (kanban + células) reduziu para 4,5 dias. Lição crucial: o desperdício mora no tempo de espera entre tarefas, não nas tarefas em si.',
        en: 'Classic VSM case: current state showed 23.6 days waiting and only 195 seconds processing. Future state (kanban + work cells) reduced to 4.5 days. Crucial lesson: waste lives in waiting time between tasks, not within the tasks themselves.'
      }
    },
    {
      company: 'Airbus',
      sector: { pt: 'Aeronáutica / Manufatura', en: 'Aeronautics / Manufacturing' },
      lesson: {
        pt: 'Usa layout de posição fixa para montar aviões em Toulouse: o avião permanece estacionário enquanto subconjuntos (asas, motores, assentos) são entregues na sequência correta. Gestão de projeto sofisticada coordena as entregas sem bloquear outras linhas.',
        en: 'Uses fixed position layout to assemble aircraft in Toulouse: the aircraft stays stationary while sub-assemblies (wings, engines, seats) are delivered in the correct sequence. Sophisticated project management coordinates deliveries without blocking other lines.'
      }
    },
    {
      company: 'Amazon',
      sector: { pt: 'E-commerce / Tecnologia de Processos', en: 'E-commerce / Process Technology' },
      lesson: {
        pt: 'Sucesso baseado em tecnologia de processo: sistemas de picking, packing e shipping integrados com pedidos online em tempo real. Usa robôs, RFID, AGVs e sistemas de visão nos centros de distribuição. Webvan (concorrente) faliu por subestimar a complexidade da operação física.',
        en: 'Success based on process technology: integrated picking, packing and shipping systems with real-time online orders. Uses robots, RFID, AGVs and vision systems. Webvan went bankrupt for underestimating the complexity of physical operations.'
      }
    },
    {
      company: 'MCT ReMan Ltd',
      sector: { pt: 'Manufatura / Remanufatura Sustentável', en: 'Manufacturing / Sustainable Remanufacturing' },
      lesson: {
        pt: 'Empresa de remanufatura que desmonta, reconstrói e revende componentes usados (motores, câmbios). Processo sustentável que estende o ciclo de vida dos produtos, reduz resíduos e consome menos energia que fabricar peças novas. Ilustra o impacto de legislação ambiental no design de processos.',
        en: 'Remanufacturing company disassembling, rebuilding and reselling used components (engines, gearboxes). Sustainable process extending product life cycles, reducing waste and consuming less energy than manufacturing new parts. Illustrates the impact of environmental legislation on process design.'
      }
    }
  ],
  glossary: [
    { term: 'VSM', definition: { pt: 'Value Stream Map — mapa de fluxo de valor, ferramenta lean para identificar e eliminar desperdício num processo', en: 'Value Stream Map — lean tool for identifying and eliminating waste in a process' } },
    { term: 'MTO', definition: { pt: 'Make to Order — fabricar sob pedido; produção inicia após o pedido do cliente', en: 'Make to Order — production starts only after the customer order is placed' } },
    { term: 'MTS', definition: { pt: 'Make to Stock — fabricar para estoque; produção baseada em previsão, antes do pedido', en: 'Make to Stock — production based on demand forecast, before the order arrives' } },
    { term: 'ATO', definition: { pt: 'Assemble to Order — montar sob pedido; componentes padronizados montados após o pedido', en: 'Assemble to Order — standardized components assembled only after the customer order' } },
    { term: 'WIP', definition: { pt: 'Work in Progress — trabalho em andamento; estoque acumulado entre etapas do processo, principal fonte de desperdício', en: 'Work in Progress — inventory accumulated between process steps; main source of waste' } },
    { term: 'C/T', definition: { pt: 'Cycle Time — tempo de ciclo; tempo real de processamento de uma unidade de output numa etapa', en: 'Cycle Time — actual time to produce one unit of output at a process step' } },
    { term: 'C/O', definition: { pt: 'Changeover Time — tempo de troca/setup; tempo para mudar a produção de um produto para outro', en: 'Changeover Time — time to switch production from one product type to another' } },
    { term: 'FMS', definition: { pt: 'Flexible Manufacturing System — sistema de manufatura flexível; controlado por computador central, produz baixo volume/alta variedade economicamente', en: 'Flexible Manufacturing System — centrally computer-controlled; produces low volume/high variety economically' } },
    { term: 'CIM', definition: { pt: 'Computer-Integrated Manufacturing — manufatura integrada por computador; integra design (CAD), produção, estoque e logística num único sistema digital', en: 'Computer-Integrated Manufacturing — integrates design (CAD), production, inventory and logistics in one digital system' } },
    { term: 'RFID', definition: { pt: 'Radio Frequency Identification — identificação por radiofrequência; leitura sem linha de visão, rastreia peças, pacientes e ativos', en: 'Radio Frequency Identification — wireless identification without line-of-sight; tracks parts, patients and assets' } },
    { term: 'AGV', definition: { pt: 'Automated Guided Vehicle — veículo guiado automaticamente; move materiais em fábricas e armazéns sem intervenção humana', en: 'Automated Guided Vehicle — electronically controlled cart moving materials around large facilities without human intervention' } },
    { term: 'OEE', definition: { pt: 'Overall Equipment Effectiveness — eficácia global do equipamento; numerador da fórmula do Takt time', en: 'Overall Equipment Effectiveness — used as the numerator in the Takt time formula' } },
    { term: 'Takt Time', definition: { pt: 'Ritmo definido pelo cliente: OEE ÷ Demanda média. O "metrônomo" da operação.', en: 'Customer-defined rhythm: OEE ÷ Average demand. The "metronome" of the operation.' } },
    { term: 'Pacemaker Task', definition: { pt: 'Tarefa marcapasso — define a velocidade de todo o processo no VSM; recebe sinal de demanda direto do cliente, sem WIP a jusante', en: 'Pacemaker task — sets the pace of the entire VSM process; receives demand signal directly from customer, no WIP downstream' } },
    { term: 'Line Balancing', definition: { pt: 'Balanceamento de linha — distribuição de tarefas entre estações para tempos aproximadamente iguais, minimizando ociosidade', en: 'Distribution of tasks among workstations to achieve approximately equal times, minimizing idle time' } }
  ],
  connections: [
    { week: 1, reason: { pt: 'O Modelo dos 4Vs (Semana 1) define o perfil operacional que direciona o tipo de processo: alto volume → contínuo; alta variedade → job shop', en: 'The 4Vs Model (Week 1) defines the operational profile directing process type: high volume → continuous; high variety → job shop' } },
    { week: 2, reason: { pt: 'Hayes & Wheelwright criaram o Modelo de 4 Estágios (Semana 2) E o modelo Volume-Variedade desta semana — os dois complementam a estratégia de operações', en: 'Hayes & Wheelwright created both the 4-Stage Model (Week 2) AND the Volume-Variety model this week — both complement operations strategy' } },
    { week: 3, reason: { pt: 'Arquitetura de produto (Semana 3): produtos modulares permitem batch/linha de montagem (ATO); produtos integrais exigem job shop/projeto (MTO)', en: 'Product architecture (Week 3): modular products allow batch/assembly line (ATO); integral products require job shop/project (MTO)' } }
  ],
  flashcards: [
    {
      q: { pt: 'Quais são os 5 tipos de processo, do menor para o maior volume?', en: 'What are the 5 process types from lowest to highest volume?' },
      a: { pt: 'Projeto → Oficina (Job Shop) → Lote (Batch) → Linha de Montagem → Contínuo. À medida que o volume sobe, a variedade cai.', en: 'Project → Job Shop → Batch → Assembly Line → Continuous. As volume rises, variety falls.' }
    },
    {
      q: { pt: 'Qual é a fórmula do Takt time e o que ela significa?', en: 'What is the Takt time formula and what does it mean?' },
      a: { pt: 'Takt time = OEE ÷ Demanda média. É o ritmo de produção exigido pelo cliente — o tempo que a operação tem para produzir cada unidade.', en: 'Takt time = OEE ÷ Average demand. The production rhythm required by the customer — how long the operation has to produce each unit.' }
    },
    {
      q: { pt: 'O que diz a Lei de Little?', en: "What does Little's Law state?" },
      a: { pt: 'Throughput total = WIP × Tempo de ciclo por item. Reduzir o WIP reduz o lead time proporcionalmente.', en: 'Total throughput time = WIP × Item cycle time. Reducing WIP reduces lead time proportionally.' }
    },
    {
      q: { pt: 'Qual a diferença entre MTO, MTS e ATO?', en: 'What is the difference between MTO, MTS and ATO?' },
      a: { pt: 'MTS: produz antes do pedido (estoque). ATO: componentes em estoque, monta após pedido. MTO: produção começa do zero após o pedido (máxima customização).', en: 'MTS: produces before the order (stock). ATO: components in stock, assembles after order. MTO: production starts from scratch after the order (maximum customization).' }
    },
    {
      q: { pt: 'Quais são os 4 tipos de layout físico?', en: 'What are the 4 physical layout types?' },
      a: { pt: '(1) Posição Fixa — produto estático, recursos se movem; (2) Dominado por Produto-Serviço — linha de montagem; (3) Dominado por Processo — departamentos por função; (4) Célula de Trabalho — híbrido, U ou reta.', en: '(1) Fixed Position — static product, resources move; (2) Product-Service Dominant — assembly line; (3) Process-Dominant — departments by function; (4) Work Cell — hybrid, U-shaped or straight.' }
    },
    {
      q: { pt: 'Por que processos fora da diagonal Volume-Variedade são ineficientes?', en: 'Why are processes off the Volume-Variety diagonal inefficient?' },
      a: { pt: 'Alto volume + alta variedade = custo proibitivo. Baixo volume + baixa variedade = escala insuficiente. A zona eficiente é a diagonal.', en: 'High volume + high variety = prohibitive cost. Low volume + low variety = insufficient scale. The efficient zone is the diagonal.' }
    },
    {
      q: { pt: 'Qual a diferença entre diagrama de fluxo e swim lane map?', en: 'What is the difference between a flow diagram and a swim lane map?' },
      a: { pt: 'Diagrama de fluxo: sequência lógica de atividades. Swim Lane: adiciona quem faz o quê (eixo Y por função) e quando (eixo X temporal), revelando hand-offs e tempos de espera.', en: 'Flow diagram: logical sequence of activities. Swim Lane: adds who does what (Y axis by function) and when (X axis over time), revealing hand-offs and waiting times.' }
    },
    {
      q: { pt: 'No caso ACME, qual era a maior fonte de desperdício?', en: 'In the ACME case, what was the biggest source of waste?' },
      a: { pt: 'O tempo de espera entre tarefas: 23,6 dias de espera vs. apenas 195 segundos de processamento. O estado futuro reduziu para 4,5 dias. O desperdício estava no tempo ocioso, não no trabalho.', en: 'Waiting time between tasks: 23.6 days waiting vs. only 195 seconds processing. The future state reduced it to 4.5 days. Waste was in idle time, not in the work itself.' }
    },
    {
      q: { pt: 'O que é uma tarefa marcapasso (pacemaker task) no VSM?', en: 'What is a pacemaker task in VSM?' },
      a: { pt: 'A tarefa que define a velocidade de todo o processo. Recebe o sinal de demanda diretamente do cliente e não há WIP a jusante (downstream). Garante fluxo puxado (pull).', en: 'The task setting the pace of the entire process. Receives demand signal directly from customer with no downstream WIP. Ensures a pull flow system.' }
    },
    {
      q: { pt: 'Por que o IKEA usa um layout dominado por processo?', en: 'Why does IKEA use a process-dominant layout?' },
      a: { pt: 'O layout força clientes a percorrer todos os departamentos (incluindo o restaurante), maximizando exposição e compras não planejadas. É uma estratégia deliberada de experiência de compra.', en: 'The layout forces customers through every department (including the restaurant), maximizing exposure and unplanned purchases. It is a deliberate shopping experience strategy.' }
    },
    {
      q: { pt: 'O que é layout de posição fixa e quando é usado?', en: 'What is fixed position layout and when is it used?' },
      a: { pt: 'O produto permanece estacionário e recursos se movem até ele. Usado quando o produto é grande demais ou frágil para ser movido: navios, aviões, cirurgias, obras civis.', en: 'The product stays stationary and resources move to it. Used when the product is too large or fragile to move: ships, aircraft, surgeries, civil construction.' }
    },
    {
      q: { pt: 'Qual a diferença entre FMS e CIM?', en: 'What differentiates FMS from CIM?' },
      a: { pt: 'FMS: integra máquinas e movimentação de materiais numa célula controlada por computador. CIM: estende o FMS ao design (CAD), estoque, armazenagem e expedição — a empresa digital completa.', en: 'FMS: integrates machines and materials handling in a computer-controlled cell. CIM: extends FMS to design (CAD), inventory, warehousing and shipping — the complete digital enterprise.' }
    }
  ],
  links: [
    {
      title: 'Learning to See — Value Stream Mapping (Lean Enterprise Institute)',
      url: 'https://www.lean.org/store/book/learning-to-see/',
      type: 'article',
      description: {
        pt: 'Livro de Rother e Shook que sistematizou o VSM como ferramenta lean. Inclui o caso ACME completo com exemplos práticos de estado atual e futuro.',
        en: 'Book by Rother and Shook that systematized VSM as the main lean tool. Includes the complete ACME case with practical current and future state examples.'
      }
    }
  ],
  notes: {
    pt: `═══ SEMANA 4 — DESIGN DE PROCESSOS ═══

Capítulo 5 do livro Operations Management (Paton, Clegg, Hsuan & Pilkington, 2ª ed.)

═══ TEMA CENTRAL ═══

O design de processos conecta três decisões estratégicas:
1. TIPO DE PROCESSO — como produzir (Projeto, Job Shop, Batch, Linha de Montagem, Contínuo)
2. TIPO DE PEDIDO — quando produzir (MTO, ATO, MTS)
3. TIPO DE LAYOUT — onde e como organizar (Posição Fixa, Processo, Produto-Serviço, Célula)

═══ 1. PENSAMENTO SISTÊMICO ═══

Todo processo é um sistema com 5 elementos (Figura 5.1):
• Elementos — componentes individuais (máquinas, pessoas, materiais)
• Relacionamentos — como interagem entre si
• Fronteira — o que está dentro/fora do sistema
• Loops de feedback — auto-regulação do sistema
• Ambiente — contexto externo que influencia o sistema

Holismo vs Reducionismo:
- Holismo: o todo > soma das partes. Operação coordenada gera mais valor.
- Reducionismo: estudar partes isoladas → sub-otimização do sistema inteiro.

Modelo Input-Processo-Output (Figura 5.2):
Controles ↓ → [Transformação] ← Recursos de Transformação ↑
               Inputs → → Outputs

═══ 2. OS 5 TIPOS DE PROCESSO (Hayes & Wheelwright, 1979) ═══

A diagonal Volume-Variedade:

PROJETO → Job Shop → Batch → Linha de Montagem → Contínuo
(baixo volume, alta variedade) ←————————→ (alto volume, baixa variedade)

PROJETO: único | posição fixa | MTO | Ex: Airbus Toulouse, Olimpíadas
JOB SHOP: muito baixo | processo dominante | MTO | Ex: Läderach, cirurgia
BATCH: médio | célula ou processo | MTO/ATO | Ex: padaria, cervejaria
ASSEMBLY LINE: alto | produto-serviço dominante | ATO/MTS | Ex: Toyota, Tesla
CONTÍNUO: altíssimo (24/7) | produto-serviço extremo | MTS | Ex: refinaria, usina

ZONA MORTA:
- Alto volume + alta variedade = custo inviável (canto superior direito)
- Baixo volume + baixa variedade = escala insuficiente (canto inferior esquerdo)
→ Solução: customização em massa via FMS/CIM empurra o limite da diagonal

═══ 3. TIPOS DE PEDIDO E PONTO DE CUSTOMIZAÇÃO ═══

MTS (Make to Stock): produção antes do pedido (previsão)
- Lead time: curto | Customização: zero | Ex: supermercado, lata de refrigerante
- Risco: estoque encalhado se previsão errar

ATO (Assemble to Order): componentes em estoque, montagem após pedido
- Lead time: moderado | Customização: limitada (combinações de módulos)
- Ex: Dell, Tesla, fast food personalizado
- Ponto de customização: na montagem

MTO (Make to Order): produção começa do zero após pedido
- Lead time: longo | Customização: máxima
- Ex: Läderach, casa personalizada, obra civil
- Ponto de customização: na concepção

═══ 4. MAPEAMENTO DE PROCESSOS ═══

Perguntas que guiam o mapeamento:
• O processo está alinhado com a estratégia competitiva?
• Há etapas sem valor agregado (non-value-adding)?
• O processo maximiza valor percebido pelo cliente?
• O processo vai ganhar pedidos?

5 Ferramentas:

(a) DIAGRAMA DE FLUXO
- Símbolos: Decisão (losango), Dados (retângulo), Início/Fim (oval), Processo (rect. arredondado)
- Figura 5.6: Pedido de sofá (Start → Compra → Pedido → Verificação estoque → Despacho → End)
- Melhor para: processos simples e lineares

(b) SWIM LANE MAP
- Eixo Y: funções/responsáveis (raias) | Eixo X: tempo
- Revela hand-offs entre departamentos e tempos de espera
- Figura 5.7: mesmo pedido de sofá — Customer / Sales Admin / Warehouse / Factory

(c) GRÁFICO DE PROCESSO (Process Chart)
- 5 símbolos: Operação ○, Transporte →, Inspeção □, Espera D, Armazenagem ∇
- Foco em atividades que adicionam valor vs. que não adicionam
- Figura 5.8: entrega de documentos — 24 atividades mapeadas

(d) BLUEPRINT DE SERVIÇO (Shostack, 1984)
- Evidência Física | Ações do Usuário | Linha de Interação | Front-of-stage
- Linha de Visibilidade | Back-of-stage | Linha de Interação Interna | Suporte
- Figura 5.9: Boas-vindas a novos estudantes de curso universitário
- Melhor para: processos com alto componente de serviço ao cliente

(e) MAPA DE FLUXO DE VALOR (VSM)
- Ícones: Fornecedor/Cliente (fábrica), Atividade (caixa), WIP (triângulo), Kanban
- Métricas: C/T (cycle time), C/O (changeover), Uptime, Nº de turnos
- Takt time = OEE / Demanda média
- Lei de Little: Throughput total = WIP × C/T por item

Caso ACME (Figuras 5.11 → 5.13):
Estado Atual: Stamping → SWeld1 → SWeld2 → Assembly1 → Assembly2 → Shipping
- Espera: 23,6 dias | Processamento: 195 segundos → ineficiente!
Estado Futuro: células consolidadas + kanban + fluxo contínuo
- Espera: 4,5 dias | Processamento: 169 segundos
- Melhoria: 19,1 dias de desperdício eliminados (redução de 81%!)
Lei de Little: se WIP cai de muito para pouco, o throughput cai proporcionalmente

═══ 5. LAYOUTS FÍSICOS DE PROCESSOS ═══

6 fatores que influenciam decisões de layout:
• Equipamentos de movimentação de materiais
• Requisitos de capacidade e espaço
• Ambiente e estética
• Fluxos de informação
• Custo de mover materiais entre áreas de trabalho
• Nível de interação com clientes e funcionários

4 Tipos de Layout:

(1) POSIÇÃO FIXA → Process type: Projeto
- Produto estacionário, recursos se movem ao redor
- Quando: produto grande, frágil ou imóvel
- Ex: Airbus Toulouse, cirurgias, Olimpíadas, obras, concertos
- Desafio: coordenação de timing; falta de espaço de armazenagem

(2) DOMINADO POR PRODUTO-SERVIÇO → Process types: Linha de Montagem, Contínuo
- Fluxo linear de alto volume e padronização
- Um produto/serviço → sequência fixa → esteira/linha
- Ex: Toyota, alfândega, lavanderia industrial
- Vantagem: baixo custo unitário, alta eficiência
- Desvantagem: inflexível, ambiente repetitivo, vulnerável a quebras

(3) DOMINADO POR PROCESSO → Process types: Job Shop, Batch
- Organizado por tipo de função (departamentos especializados)
- Itens percorrem rotas diferentes pelos departamentos
- Ex: hospitais, IKEA, machine shop, universidades, bancos
- Vantagem: flexível, lida com alta variedade
- Desvantagem: alto WIP, roteamento complexo, baixa utilização

(4) CÉLULA DE TRABALHO (híbrido) → Process types: Batch, Job Shop
- Agrupa máquinas e pessoas para família de produtos
- Formatos: reta (straight line) ou U (Figura 5.16)
- Vantagem: menor WIP, menos espaço, melhor moral, fluxo mais rápido
- U: facilita compartilhamento de workstations e comunicação
- Pode ser "planta dentro de uma planta" — semi-autônoma

Tabela de matching:
Projeto → MTO → Posição Fixa
Job Shop → MTO → Processo Dominante
Batch → MTO/ATO → Célula ou Processo
Assembly Line → ATO/MTS → Produto-Serviço Dominante
Contínuo → MTS → Produto-Serviço Dominante

Proximity Pyramid (Figura 5.14 — Clothing Company):
Técnica para decidir adjacência de departamentos com base em frequência de interação.
Códigos A/E/I/O/U/X (Absolutamente necessário → Indesejável)
Fórmula: Custo total de movimentação = Custo unitário × Nº de itens a mover

═══ 6. TECNOLOGIA EM PROCESSOS ═══

Tecnologias de Produção:
• Machine Technology: precisão de 1/100 fio de cabelo; conectadas a IoT
• RFID: rastreia peças, pacientes e ativos sem linha de visão (Jaguar Land Rover)
• Controle de Processo: sensores → computador → ajuste automático (refinarias, usinas)
• Sistemas de Visão: câmeras + IA para inspeção automatizada (cervejarias, pipelines)
• Robôs: soldagem (Toyota), tarefas pesadas, repetitivas ou perigosas
• AGV: carrinhos controlados em fábricas, hospitais e armazéns
• FMS: manufatura flexível por computador central — baixo vol/alta var economicamente
• CIM: FMS + CAD + estoque + armazenagem + expedição = empresa digital integrada

Caso Amazon (Short Case 5.5):
Fundada 1994. Sucesso = tecnologia de processo integrada (frontend + backend).
Usa robôs, RFID, AGVs, sistemas de visão. Webvan faliu por não investir na operação física.
Lição: tecnologia de processo é ativo estratégico, não suporte.

═══ EQUAÇÕES-CHAVE ═══

Takt time = OEE / Demanda média
Custo total de movimentação = Custo unitário × Nº de itens a mover
Lei de Little: Throughput total = WIP × C/T por item

═══ FONTES ═══

📖 Ebook — EBOOK_ Operations Management 2_e.pdf
   → Capítulo 5, pp. 139–176 (Process Design completo)
   → pp. 139–151: Systems Thinking, 5 Process Types, Volume & Variety
   → pp. 152–162: Process Mapping (Flow Diagram, Swim Lane, VSM, Service Blueprint)
   → pp. 162–176: Physical Layouts, Technology in Processes

📊 Figura 5.1 (p.140) → Propriedades de sistemas
📊 Figura 5.2 (p.141) → Modelo Input-Processo-Output
📊 Figura 5.6 (p.153) → Flow Diagram (pedido de sofá)
📊 Figura 5.7 (p.154) → Swim Lane Map
📊 Figura 5.9 (p.156) → Service Blueprint (boas-vindas a estudantes)
📊 Figura 5.11 (p.157) → VSM Estado Atual (ACME, suportes para tratores)
📊 Figura 5.13 (p.159) → VSM Estado Futuro (ACME, lean)
📊 Figura 5.14 (p.167) → Proximity Pyramid (Clothing Company)
📊 Figura 5.16 (p.168) → Work Cell Layouts (reta e U) → base para vis_facilityLayouts

📝 Conteúdo introdutório do usuário: Welcome Break, Dell (ATO), IKEA (layout), Tesla, Läderach (MTO), bespoke products`,

    en: `═══ WEEK 4 — PROCESS DESIGN ═══

Chapter 5 of Operations Management (Paton, Clegg, Hsuan & Pilkington, 2nd ed.)

═══ CORE THEME ═══

Process design connects three strategic decisions:
1. PROCESS TYPE — how to produce (Project, Job Shop, Batch, Assembly Line, Continuous)
2. ORDER TYPE — when to produce (MTO, ATO, MTS)
3. LAYOUT TYPE — where and how to organize (Fixed Position, Process, Product-Service, Work Cell)

═══ 1. SYSTEMS THINKING ═══

Every process is a system with 5 elements (Figure 5.1):
• Elements — individual components (machines, people, materials)
• Relationships — how they interact
• Boundary — what is inside/outside the system
• Feedback loops — self-regulation
• Environment — external context

Holism vs Reductionism:
- Holism: the whole > sum of its parts. A coordinated operation generates more value.
- Reductionism: studying parts in isolation → whole-system sub-optimization.

Input-Process-Output model (Figure 5.2):
Controls ↓ → [Transformation] ← Transforming Resources ↑
               Inputs → → Outputs

═══ 2. THE 5 PROCESS TYPES (Hayes & Wheelwright, 1979) ═══

The Volume-Variety diagonal:

Project → Job Shop → Batch → Assembly Line → Continuous
(low volume, high variety) ←————————→ (high volume, low variety)

PROJECT: unique | fixed position | MTO | Ex: Airbus Toulouse, Olympics
JOB SHOP: very low vol | process-dominant | MTO | Ex: Läderach, cardiac surgery
BATCH: medium | cell or process | MTO/ATO | Ex: bakery, brewery
ASSEMBLY LINE: high | product-service-dominant | ATO/MTS | Ex: Toyota, Tesla
CONTINUOUS: very high (24/7) | extreme product-service | MTS | Ex: oil refinery, power plant

DEAD ZONE:
- High volume + high variety = prohibitive cost (top right corner)
- Low volume + low variety = insufficient scale (bottom left corner)
→ Solution: mass customization via FMS/CIM pushes the diagonal limit

═══ 3. ORDER TYPES AND CUSTOMIZATION POINT ═══

MTS (Make to Stock): production before the order (based on forecast)
- Lead time: short | Customization: zero | Ex: supermarket, canned drinks
- Risk: unsold stock if forecast is wrong

ATO (Assemble to Order): components in stock, assembly after order
- Lead time: moderate | Customization: limited (module combinations)
- Ex: Dell, Tesla, personalized fast food
- Customization point: at assembly

MTO (Make to Order): production starts from scratch after order
- Lead time: long | Customization: maximum
- Ex: Läderach, custom home, civil construction
- Customization point: at conception

═══ 4. PROCESS MAPPING ═══

Guiding questions:
• Is the process aligned with competitive strategy?
• Are there non-value-adding steps to eliminate?
• Does the process maximize customer-perceived value?
• Will the process win orders?

5 Tools:

(a) FLOW DIAGRAM
- Symbols: Decision (diamond), Data (rectangle), Start/End (oval), Process (rounded rect)
- Figure 5.6: Sofa order (Start → Buys → Order → Stock check → Dispatch → End)
- Best for: simple, linear processes

(b) SWIM LANE MAP
- Y axis: functions/roles (lanes) | X axis: time
- Reveals hand-offs and waiting times
- Figure 5.7: sofa process — Customer / Sales Admin / Warehouse / Factory

(c) PROCESS CHART
- 5 symbols: Operation ○, Transport →, Inspection □, Delay D, Storage ∇
- Focus on value-adding vs. non-value-adding activities
- Figure 5.8: document delivery — 24 activities mapped

(d) SERVICE BLUEPRINT (Shostack, 1984)
- Physical Evidence | User Actions | Line of Interaction | Front-of-stage
- Line of Visibility | Back-of-stage | Line of Internal Interaction | Support
- Figure 5.9: Welcoming new students to a university course
- Best for: processes with high customer service component

(e) VALUE STREAM MAP (VSM)
- Icons: Supplier/Customer (factory), Activity (box), WIP (triangle), Kanban
- Metrics: C/T (cycle time), C/O (changeover), Uptime, No. of shifts
- Takt time = OEE / Average demand
- Little's Law: Total throughput = WIP × C/T per item

ACME case (Figures 5.11 → 5.13):
Current State: Stamping → SWeld1 → SWeld2 → Assembly1 → Assembly2 → Shipping
- Waiting: 23.6 days | Processing: 195 seconds → highly inefficient!
Future State: consolidated cells + kanban + continuous flow
- Waiting: 4.5 days | Processing: 169 seconds
- Improvement: 19.1 days of waste eliminated (81% reduction!)

═══ 5. PHYSICAL LAYOUTS OF PROCESSES ═══

6 factors influencing layout decisions:
• Materials handling equipment
• Capacity and space requirements
• Environment and aesthetics
• Flows of information
• Cost of moving materials between work areas
• Appropriate levels of customer and employee interaction

4 Layout Types:

(1) FIXED POSITION → Process type: Project
- Product stationary, resources move to it
- When to use: product too large, fragile or immovable
- Ex: Airbus Toulouse, surgeries, Olympics, construction, concerts
- Challenge: delivery timing coordination; lack of on-site storage space

(2) PRODUCT-SERVICE-DOMINANT → Process types: Assembly Line, Continuous
- Linear high-volume standardized flow
- One product/service → fixed sequence → conveyor/line
- Ex: Toyota, airport customs, industrial laundry
- Advantage: low unit cost, high efficiency
- Disadvantage: inflexible, repetitive environment, breakdown-vulnerable

(3) PROCESS-DOMINANT → Process types: Job Shop, Batch
- Organized by type of function (specialized departments)
- Items follow different routes through departments
- Ex: hospitals, IKEA, machine shop, universities, banks
- Advantage: flexible, handles high variety
- Disadvantage: high WIP, complex routing, low equipment utilization

(4) WORK CELL (hybrid) → Process types: Batch, Job Shop
- Groups machines and people for a product family
- Formats: straight line or U-shaped (Figure 5.16)
- Advantage: less WIP, less space, better morale, quicker flow
- U-shaped: facilitates workstation sharing and communication
- Can become "plant within a plant" — semi-autonomous

Matching table:
Project → MTO → Fixed Position
Job Shop → MTO → Process-Dominant
Batch → MTO/ATO → Cell or Process
Assembly Line → ATO/MTS → Product-Service-Dominant
Continuous → MTS → Product-Service-Dominant

Proximity Pyramid (Figure 5.14 — Clothing Company):
Technique for deciding department adjacency based on interaction frequency.
Codes A/E/I/O/U/X (Absolutely necessary → Undesirable)
Formula: Total cost of moving = Unit cost × Number of items to move

═══ 6. TECHNOLOGY IN PROCESSES ═══

Production Technologies:
• Machine Technology: 1/100th of a human hair precision; IoT-connected
• RFID: tracks parts, patients and assets without line-of-sight (Jaguar Land Rover)
• Process Control: sensors → computer → automatic adjustment (refineries, power plants)
• Vision Systems: cameras + AI for automated inspection (breweries, gas pipelines)
• Robots: welding (Toyota), heavy, repetitive or dangerous tasks
• AGV: computer-controlled carts in factories, hospitals and warehouses
• FMS: flexible manufacturing by central computer — low vol/high variety economically
• CIM: FMS + CAD + inventory + warehousing + shipping = integrated digital enterprise

Amazon case (Short Case 5.5):
Founded 1994. Success = integrated process technology (frontend + backend).
Uses robots, RFID, AGVs, vision systems. Webvan failed by not investing in physical operations.
Lesson: process technology is a strategic asset, not support.

═══ KEY EQUATIONS ═══

Takt time = OEE / Average demand
Total cost of moving = Unit cost × Number of items to move
Little's Law: Total throughput = WIP × C/T per item

═══ SOURCES ═══

📖 Ebook — EBOOK_ Operations Management 2_e.pdf
   → Chapter 5, pp. 139–176 (Process Design complete)
   → pp. 139–151: Systems Thinking, 5 Process Types, Volume & Variety
   → pp. 152–162: Process Mapping (Flow Diagram, Swim Lane, VSM, Service Blueprint)
   → pp. 162–176: Physical Layouts, Technology in Processes

📊 Figure 5.1 (p.140) → Systems properties network diagram
📊 Figure 5.2 (p.141) → Input-Process-Output model
📊 Figure 5.6 (p.153) → Flow Diagram (sofa ordering)
📊 Figure 5.7 (p.154) → Swim Lane Map
📊 Figure 5.9 (p.156) → Service Blueprint (welcoming students)
📊 Figure 5.11 (p.157) → Current State VSM (ACME, tractor brackets)
📊 Figure 5.13 (p.159) → Future State VSM (ACME, lean)
📊 Figure 5.14 (p.167) → Proximity Pyramid (Clothing Company)
📊 Figure 5.16 (p.168) → Work Cell Layouts (straight and U-shaped) → base for vis_facilityLayouts

📝 Introductory content from user: Welcome Break, Dell (ATO), IKEA (layout), Tesla, Läderach (MTO), bespoke products`
  }
};
