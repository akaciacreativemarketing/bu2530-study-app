window.WEEKS_DATA = window.WEEKS_DATA || {};
window.WEEKS_DATA['operations-management'] = window.WEEKS_DATA['operations-management'] || {};
window.WEEKS_DATA['operations-management'][8] = {
  week: 8,
  status: 'not-started',
  title: { pt: 'Operações Enxutas', en: 'Lean Operations' },
  overview: {
    pt: 'A produção enxuta (lean) é o caso extremo da gestão de estoque que abrimos na Semana 7: buscar estoque quase ZERO, entregando rápido, com qualidade quase perfeita e custo baixo. Nasceu na Toyota (o Sistema Toyota de Produção, TPS) como resposta mais eficiente que a produção em massa de Ford. Duas ideias-chave: (1) PUXAR em vez de EMPURRAR — nada é produzido até haver um sinal de demanda real (o oposto do MRP da Semana 7, que empurra por previsão); o kanban é esse sinal. (2) Eliminar DESPERDÍCIO (muda) em todos os níveis. Mas atenção: o lean é um sistema INTEIRO — depende de várias fundações que só funcionam juntas. Muitas empresas tentaram e falharam por copiar só um pedaço. Vemos as fundações, as ferramentas (kanban, 5S, fluxo), a aplicação em serviços (McDonald\'s, hospitais) e os LIMITES do lean (a fragilidade exposta na COVID-19).',
    en: 'Lean production is the extreme case of the inventory management we opened in Week 7: aiming for near-ZERO stock, delivering fast, with near-perfect quality at low cost. It was born at Toyota (the Toyota Production System, TPS) as a more efficient answer than Ford\'s mass production. Two key ideas: (1) PULL instead of PUSH — nothing is made until there is a real demand signal (the opposite of Week 7\'s MRP, which pushes to forecast); the kanban is that signal. (2) Eliminate WASTE (muda) at all levels. But beware: lean is a WHOLE system — it relies on several foundations that only work together. Many firms tried and failed by copying just one piece. We cover the foundations, the tools (kanban, 5S, flow), its application in services (McDonald\'s, hospitals) and the LIMITS of lean (the fragility exposed by COVID-19).'
  },
  concepts: [
    {
      pt: 'Produção Enxuta (Lean) / Just-in-Time (JIT)',
      en: 'Lean Production / Just-in-Time (JIT)',
      definition: {
        pt: 'Sistema que produz e entrega exatamente o que é preciso, na quantidade certa, no momento certo — nem antes, nem depois. Meta: estoque quase zero, fluxo rápido, qualidade quase perfeita, custo baixo. Também chamado de "estoque zero" ou produção enxuta. Não serve para toda situação, mas onde funciona é muito eficiente.',
        en: 'A system that produces and delivers exactly what is needed, in the right quantity, at the right moment — not before, not after. Goal: near-zero stock, fast flow, near-perfect quality, low cost. Also called "zero inventory" or lean production. It doesn\'t fit every situation, but where it works it is very efficient.'
      }
    },
    {
      pt: 'Empurrar vs Puxar (Push vs Pull)',
      en: 'Push vs Pull',
      definition: {
        pt: 'Refere-se a como a produção é INICIADA. No push (empurrar), um plano central (MRP/ERP) gera as ordens por previsão e empurra o material adiante. No pull (puxar), nada se produz até chegar um pedido real: a ÚLTIMA estação responde primeiro e puxa material das anteriores. Lean é pull.',
        en: 'Refers to how production is INITIATED. In push, a central plan (MRP/ERP) generates orders from forecast and pushes material forward. In pull, nothing is made until a real order arrives: the LAST station responds first and pulls material from the earlier ones. Lean is pull.'
      }
    },
    {
      pt: 'Kanban',
      en: 'Kanban',
      definition: {
        pt: 'Palavra japonesa para "placa" ou "sinal". Técnica da Toyota que implementa o JIT: um sinal (caixa vazia, cartão, espaço demarcado) indica à estação anterior que precisa produzir mais. Sem sinal = há estoque suficiente, não produz. No McDonald\'s, é a bandeirinha metálica na fila de lanches: quando chega à frente, volta para a cozinha pedir mais.',
        en: 'Japanese for "signpost" or "signal". A Toyota technique that implements JIT: a signal (empty box, card, marked-off space) tells the previous station it needs to make more. No signal = there is enough stock, don\'t produce. At McDonald\'s, it is the metal flag in the row of burgers: when it reaches the front, it goes back to the kitchen to ask for more.'
      }
    },
    {
      pt: 'Os Três Desperdícios: Muda, Muri, Mura',
      en: 'The Three Wastes: Muda, Muri, Mura',
      definition: {
        pt: 'Ohno (1988) descreveu três tipos de desperdício: MUDA (trabalho que não agrega valor — o foco principal do lean), MURI (sobrecarga, por design ou implementação ruim: pesos excessivos, esforço além do normal) e MURA (irregularidade/desnivelamento da produção). Os três se alimentam: um sistema desnivelado (mura) gera sobrecarga (muri) que gera desperdício (muda).',
        en: 'Ohno (1988) described three types of waste: MUDA (non-value-adding work — lean\'s main focus), MURI (overburden, from poor design or implementation: excessive weights, working harder than usual) and MURA (unevenness/imbalance in production). The three feed each other: an uneven system (mura) creates overburden (muri) which creates waste (muda).'
      }
    },
    {
      pt: 'Os 7 Desperdícios Muda',
      en: 'The 7 Muda Wastes',
      definition: {
        pt: 'A lista de Ohno de 7 desperdícios que não agregam valor: Transporte, Estoque (Inventory), Movimento, Espera (Waiting), Superprodução (Overproduction), Superprocessamento (Overprocessing) e Defeitos. Mnemônico em inglês: TIMWOOD. Womack depois somou um 8º: subutilização do talento das pessoas.',
        en: 'Ohno\'s list of 7 non-value-adding wastes: Transportation, Inventory, Motion, Waiting, Overproduction, Overprocessing and Defects. Mnemonic: TIMWOOD. Womack later added an 8th: underutilization of people\'s talent.'
      }
    },
    {
      pt: '5S',
      en: '5S',
      definition: {
        pt: 'Programa para reorganizar o local e o fluxo de trabalho, eliminando desperdício. Cinco termos japoneses: Seiri (Sort/Utilização — remover o desnecessário), Seiton (Set in order/Organização — cada coisa no seu lugar demarcado), Seiso (Shine/Limpeza), Seiketsu (Standardize/Padronização das melhores práticas) e Shitsuke (Sustain/Disciplina — manter os outros 4). Aplica-se a produção E serviços.',
        en: 'A programme to reorganize the workspace and workflow, eliminating waste. Five Japanese terms: Seiri (Sort — remove the unnecessary), Seiton (Set in order — everything in its marked place), Seiso (Shine — clean), Seiketsu (Standardize — best practices) and Shitsuke (Sustain — keep the other 4 going). It applies to production AND services.'
      }
    },
    {
      pt: 'Fluxo (Flow) e Balanceamento',
      en: 'Flow and Balancing',
      definition: {
        pt: 'Fazer o produto "fluir" continuamente pela produção, sem paradas nem acúmulo, idealmente peça a peça (one-piece flow). A produção balanceada/nivelada (heijunka) suaviza o mix e o volume ao longo do tempo, evitando picos. A linha móvel do Boeing 777 é um exemplo de fluxo aplicado à manufatura de aviões.',
        en: 'Making the product "flow" continuously through production, without stops or build-up, ideally one piece at a time (one-piece flow). Balanced/level production (heijunka) smooths the mix and volume over time, avoiding spikes. Boeing\'s 777 moving line is an example of flow applied to aircraft manufacture.'
      }
    },
    {
      pt: 'Kaizen (Melhoria Contínua)',
      en: 'Kaizen (Continuous Improvement)',
      definition: {
        pt: 'Filosofia de melhoria contínua e incremental, feita por todos, todo dia. Pequenos ganhos constantes em vez de grandes saltos ocasionais. É uma das fundações da qualidade no sistema lean.',
        en: 'A philosophy of continuous, incremental improvement, done by everyone, every day. Constant small gains rather than occasional big leaps. It is one of the quality foundations of the lean system.'
      }
    },
    {
      pt: 'Princípio do Cone de Areia (Sand Cone)',
      en: 'Sand Cone Principle',
      definition: {
        pt: 'Registra que certas capacidades devem ser construídas numa ordem predeterminada, uma sobre a outra: primeiro a QUALIDADE, que dá CONFIABILIDADE (dependability), que permite VELOCIDADE (speed), que habilita FLEXIBILIDADE — e só com tudo isso vem a EFICIÊNCIA. Por isso a qualidade é a base do lean.',
        en: 'It records that certain capabilities must be built in a predetermined order, one on top of another: first QUALITY, which gives DEPENDABILITY, which allows SPEED, which enables FLEXIBILITY — and only with all these comes EFFICIENCY. That is why quality is the foundation of lean.'
      }
    },
    {
      pt: 'Lean em Serviços',
      en: 'Lean in Services',
      definition: {
        pt: 'O lean não é só de fábrica. O McDonald\'s foi pioneiro no serviço "feito na hora" (made-for-you) puxado por kanban. Hospitais usam 5S e redução de desperdício para melhorar o atendimento ao paciente (ex: Washington Hospital, Harvard Vanguard). Bancos "puxam" a produção de cartões ao abrir uma conta.',
        en: 'Lean is not just for factories. McDonald\'s pioneered the "made-for-you" service pulled by kanban. Hospitals use 5S and waste reduction to improve patient care (e.g. Washington Hospital, Harvard Vanguard). Banks "pull" card production when an account is opened.'
      }
    },
    {
      pt: 'Limites do Lean (Lean Anoréxico)',
      en: 'Limits of Lean (Anorexic Lean)',
      definition: {
        pt: 'Levar o lean longe demais ("lean anoréxico" / over-lean) deixa o sistema FRÁGIL: sem folga de estoque, qualquer interrupção para tudo. A pandemia de COVID-19 expôs isso — cadeias enxutas demais quebraram, gerando o debate "o fim do just-in-time?". A resposta não é abandonar o lean, mas equilibrar eficiência com resiliência.',
        en: 'Taking lean too far ("anorexic lean" / over-lean) makes the system FRAGILE: with no stock slack, any disruption stops everything. The COVID-19 pandemic exposed this — over-lean chains broke, sparking the "end of just-in-time?" debate. The answer is not to abandon lean, but to balance efficiency with resilience.'
      }
    },
    {
      pt: 'Lean e Sustentabilidade (Lean & Green)',
      en: 'Lean and Sustainability (Lean & Green)',
      definition: {
        pt: 'A meta do lean — mesma saída com menos entradas, cortando desperdício — casa naturalmente com a sustentabilidade (menos material, energia e refugo = menor pegada ambiental). Mas não é automático: nem todo lean reduz o impacto ambiental, depende de como é feito.',
        en: 'Lean\'s goal — same output with fewer inputs, cutting waste — fits naturally with sustainability (less material, energy and scrap = smaller footprint). But it is not automatic: not all lean lowers the environmental impact; it depends on how it is done.'
      }
    }
  ],
  theories: [
    {
      name: { pt: 'Elementos do Sistema Lean', en: 'Elements of the Lean System' },
      authors: [],
      year: '',
      renderer: 'leanElements',
      description: {
        pt: 'A grande lição da semana: o lean é um SISTEMA inteiro — todos os elementos são necessários e só funcionam juntos. Copiar um pedaço (só o kanban, só o 5S) e esperar os benefícios é o erro clássico que faz tantas implementações falharem. A Figura 10.4 resume os 6 elementos que cercam e sustentam o Sistema Lean: Fluxo (JIT, kanban, produção balanceada), Controle de Qualidade (alta qualidade, kaizen), Cuidado com o Produto (design adequado, marketing conforme o plano), Envolvimento dos Funcionários (senioridade, trabalho em equipe), Trabalho com Fornecedores (lead times curtos, relações de longo prazo) e Foco em Set-ups (baixo custo e tempo de preparação). No centro, sustentando tudo, está a qualidade (o cone de areia). Clique em cada elemento.',
        en: 'The week\'s big lesson: lean is a whole SYSTEM — all elements are needed and only work together. Copying one piece (just kanban, just 5S) and expecting the benefits is the classic mistake that makes so many implementations fail. Figure 10.4 sums up the 6 elements that surround and support the Lean System: Flow (JIT, kanban, balanced production), Quality Control (high quality, kaizen), Product Stewardship (suitable design, marketing to plans), Employee Involvement (seniority, teamwork), Working With Suppliers (short lead times, long-term relationships) and Focus On Set-ups (low set-up cost and time). At the centre, holding it all up, is quality (the sand cone). Click each element.'
      }
    },
    {
      name: { pt: 'Os 7 Desperdícios (Muda)', en: 'The 7 Wastes (Muda)' },
      authors: ['Ohno'],
      year: '1988',
      renderer: 'sevenWastes',
      description: {
        pt: 'O coração do lean é eliminar tudo que não agrega valor para o cliente. Taiichi Ohno, o pai do Sistema Toyota de Produção, catalogou 7 desperdícios (muda). Mnemônico em inglês: TIMWOOD — Transport, Inventory, Motion, Waiting, Overproduction, Overprocessing, Defects. A superprodução é considerada o pior deles, porque gera os outros (mais estoque, mais espera, mais transporte). Womack depois somou um 8º desperdício: subutilizar o talento das pessoas (ex: usar um advogado altamente treinado numa tarefa trivial). Clique em cada desperdício para o exemplo.',
        en: 'The heart of lean is eliminating everything that does not add value for the customer. Taiichi Ohno, father of the Toyota Production System, catalogued 7 wastes (muda). Mnemonic: TIMWOOD — Transport, Inventory, Motion, Waiting, Overproduction, Overprocessing, Defects. Overproduction is considered the worst, because it generates the others (more inventory, more waiting, more transport). Womack later added an 8th waste: underusing people\'s talent (e.g. putting a highly trained lawyer on a trivial task). Click each waste for the example.'
      }
    },
    {
      name: { pt: 'Framework 5S', en: 'The 5S Framework' },
      authors: [],
      year: '',
      renderer: 'fiveS',
      description: {
        pt: 'O 5S é a ferramenta prática de organização do lean — reorganiza o espaço e o fluxo de trabalho para eliminar desperdício, e funciona tanto na fábrica quanto no escritório ou hospital. São cinco passos em ordem, cada um um termo japonês começando com S: Seiri (Sort/Utilização), Seiton (Set in order/Organização), Seiso (Shine/Limpeza), Seiketsu (Standardize/Padronização) e Shitsuke (Sustain/Disciplina). O último, Sustain, é o mais difícil e o mais importante: sem disciplina para manter, tudo volta ao caos. Passe por cada S.',
        en: 'The 5S is lean\'s practical organization tool — it reorganizes the space and workflow to eliminate waste, and works in the factory as much as in the office or hospital. Five steps in order, each a Japanese term starting with S: Seiri (Sort), Seiton (Set in order), Seiso (Shine), Seiketsu (Standardize) and Shitsuke (Sustain). The last, Sustain, is the hardest and most important: without the discipline to keep it up, everything returns to chaos. Step through each S.'
      }
    },
    {
      name: { pt: 'Empurrar vs Puxar & o Kanban', en: 'Push vs Pull & the Kanban' },
      authors: [],
      year: '',
      renderer: 'kanbanPull',
      description: {
        pt: 'A diferença que o curso mais destaca: no sistema EMPURRAR (push), um plano central (MRP/ERP, da Semana 7) programa tudo por previsão e empurra o material linha abaixo — pode acumular estoque se a previsão errar. No sistema PUXAR (pull), a demanda real dispara a produção: a última estação faz o produto e isso puxa material das estações anteriores, uma a uma, para trás. O kanban é o sinal que faz o pull acontecer — uma caixa vazia ou cartão que diz "produza mais". Sem sinal, ninguém produz. É assim que o lean chega perto do estoque zero.',
        en: 'The difference the course stresses most: in the PUSH system, a central plan (MRP/ERP, from Week 7) schedules everything from forecast and pushes material down the line — it can pile up stock if the forecast is wrong. In the PULL system, real demand triggers production: the last station makes the product and this pulls material from the earlier stations, one by one, backwards. The kanban is the signal that makes pull happen — an empty box or card that says "make more". No signal, nobody produces. This is how lean gets close to zero stock.'
      }
    }
  ],
  authors: [
    {
      name: 'Taiichi Ohno',
      role: { pt: 'Engenheiro da Toyota, arquiteto do Sistema Toyota de Produção (TPS)', en: 'Toyota engineer, architect of the Toyota Production System (TPS)' },
      contribution: { pt: 'Criou o TPS e catalogou os desperdícios (muda, muri, mura + os 7 muda). É a origem prática de toda a produção enxuta moderna. Livro-chave: "Toyota Production System" (1988).', en: 'Created the TPS and catalogued the wastes (muda, muri, mura + the 7 muda). He is the practical origin of all modern lean production. Key book: "Toyota Production System" (1988).' }
    },
    {
      name: 'James Womack & Daniel Jones',
      role: { pt: 'Pesquisadores do MIT, autores de "Lean Thinking"', en: 'MIT researchers, authors of "Lean Thinking"' },
      contribution: { pt: 'Cunharam o termo "lean production" no Ocidente e sistematizaram seus princípios. Womack acrescentou o 8º desperdício: a subutilização do talento das pessoas.', en: 'Coined the term "lean production" in the West and systematized its principles. Womack added the 8th waste: the underutilization of people\'s talent.' }
    },
    {
      name: 'Shigeo Shingo',
      role: { pt: 'Engenheiro, colaborador da Toyota, criador do SMED', en: 'Engineer, Toyota collaborator, creator of SMED' },
      contribution: { pt: 'Desenvolveu o SMED (Single-Minute Exchange of Die), técnica de troca rápida de ferramentas — a base do "foco em set-ups" (set-ups rápidos e baratos) que torna os lotes pequenos do lean viáveis.', en: 'Developed SMED (Single-Minute Exchange of Die), a rapid tool-changeover technique — the basis of the "focus on set-ups" (fast, cheap set-ups) that makes lean\'s small batches viable.' }
    }
  ],
  caseStudies: [
    {
      company: 'Toyota',
      sector: { pt: 'Automotivo — criadora do lean (TPS)', en: 'Automotive — creator of lean (TPS)' },
      lesson: { pt: 'A Toyota inventou a produção enxuta (o TPS) para superar a produção em massa de Ford: em vez de empurrar grandes lotes por previsão, puxa a produção pela demanda real com kanban, eliminando desperdício. Mudou a forma como o mundo fabrica. Mas veja também o caso "máquina que rodou quente demais".', en: 'Toyota invented lean production (the TPS) to beat Ford\'s mass production: instead of pushing large batches from forecast, it pulls production by real demand with kanban, eliminating waste. It changed how the world manufactures. But see also the "machine that ran too hot" case.' }
    },
    {
      company: 'Toyota (a máquina que rodou quente demais)',
      sector: { pt: 'Automotivo — limites do lean, recalls 2010', en: 'Automotive — limits of lean, 2010 recalls' },
      lesson: { pt: 'The Economist (2010): a cadeia de suprimentos da Toyota ficou "esticada demais" na busca por crescimento e eficiência, levando a recalls massivos de qualidade. Lição dupla: (1) o lean levado ao extremo fica frágil; (2) crescer rápido demais pode comprometer as próprias fundações (qualidade) que sustentam o sistema.', en: 'The Economist (2010): Toyota\'s supply chain became "overstretched" chasing growth and efficiency, leading to massive quality recalls. Double lesson: (1) lean taken to the extreme becomes fragile; (2) growing too fast can compromise the very foundations (quality) that hold the system up.' }
    },
    {
      company: 'Ford',
      sector: { pt: 'Automotivo — contraponto (produção em massa)', en: 'Automotive — the contrast (mass production)' },
      lesson: { pt: 'O sistema de Ford (produção em massa, empurrada, grandes lotes de produtos padronizados) foi revolucionário no seu tempo, mas é menos eficiente que o JIT da Toyota: acumula estoque, é rígido a mudanças e esconde problemas de qualidade. O contraste Ford×Toyota é a própria essência de push vs pull.', en: 'Ford\'s system (mass, pushed production, large batches of standardized products) was revolutionary in its day, but is less efficient than Toyota\'s JIT: it piles up stock, is rigid to change and hides quality problems. The Ford vs Toyota contrast is the very essence of push vs pull.' }
    },
    {
      company: 'McDonald\'s',
      sector: { pt: 'Fast food — lean em serviços (made-for-you)', en: 'Fast food — lean in services (made-for-you)' },
      lesson: { pt: 'O McDonald\'s foi chamado de "a primeira organização de serviço lean": migrou para o modelo "feito na hora" (made-for-you), puxado por kanban — a bandeirinha metálica na fila de lanches sinaliza à cozinha para produzir mais. Prova que o JIT funciona também em serviços, não só em fábricas.', en: 'McDonald\'s was called "the first lean service organisation": it moved to the "made-for-you" model, pulled by kanban — the metal flag in the row of burgers signals the kitchen to make more. It proves JIT works in services too, not only factories.' }
    },
    {
      company: 'Boeing',
      sector: { pt: 'Aeroespacial — fluxo lean (linha móvel do 777)', en: 'Aerospace — lean flow (777 moving line)' },
      lesson: { pt: 'A Boeing aplicou princípios lean à montagem de aviões com a "linha móvel" do 777 (e depois o 737): o avião se move lentamente pela linha enquanto é montado, forçando o fluxo e expondo gargalos. Mostra o lean além do carro — comparar com os elementos da Figura 10.4.', en: 'Boeing applied lean principles to aircraft assembly with the 777 "moving line" (and later the 737): the plane moves slowly down the line as it is assembled, forcing flow and exposing bottlenecks. It shows lean beyond the car — compare with the elements of Figure 10.4.' }
    },
    {
      company: 'Washington Hospital / Harvard Vanguard',
      sector: { pt: 'Saúde — lean em serviços (5S no hospital)', en: 'Healthcare — lean in services (5S in hospitals)' },
      lesson: { pt: 'Hospitais aplicam a produção enxuta ao cuidado do paciente: redução de desperdício e o 5S para organizar salas, materiais e fluxos, melhorando a segurança e a rapidez do atendimento. Mostra o lean fora da manufatura, no setor de serviços mais crítico.', en: 'Hospitals apply lean production to patient care: waste reduction and 5S to organize rooms, materials and flows, improving safety and speed of care. It shows lean outside manufacturing, in the most critical service sector.' }
    }
  ],
  glossary: [
    { term: 'Lean / JIT', definition: { pt: 'Produzir e entregar exatamente o necessário, no momento certo; estoque quase zero. Também "just-in-time" ou "estoque zero".', en: 'Produce and deliver exactly what is needed, at the right moment; near-zero stock. Also "just-in-time" or "zero inventory".' } },
    { term: 'Push (empurrar)', definition: { pt: 'Plano central (MRP/ERP) gera ordens por previsão e empurra o material adiante. Pode acumular estoque.', en: 'A central plan (MRP/ERP) generates orders from forecast and pushes material forward. Can pile up stock.' } },
    { term: 'Pull (puxar)', definition: { pt: 'Só se produz após um pedido real; a última estação responde primeiro e puxa das anteriores. Lean é pull.', en: 'Nothing is made until a real order; the last station responds first and pulls from earlier ones. Lean is pull.' } },
    { term: 'Kanban', definition: { pt: '"Sinal" (japonês). Caixa vazia/cartão que dispara a produção no sistema pull. Ex: bandeirinha do McDonald\'s.', en: '"Signal" (Japanese). Empty box/card that triggers production in a pull system. E.g. McDonald\'s flag.' } },
    { term: 'Muda', definition: { pt: 'Desperdício: trabalho que não agrega valor. O foco central do lean (os 7 desperdícios).', en: 'Waste: non-value-adding work. Lean\'s central focus (the 7 wastes).' } },
    { term: 'Muri', definition: { pt: 'Sobrecarga: esforço/tensão excessivos por design ou implementação ruim.', en: 'Overburden: excessive effort/strain from poor design or implementation.' } },
    { term: 'Mura', definition: { pt: 'Irregularidade/desnivelamento da produção. A produção nivelada (heijunka) combate a mura.', en: 'Unevenness/imbalance in production. Level production (heijunka) fights mura.' } },
    { term: 'TIMWOOD', definition: { pt: 'Mnemônico dos 7 muda: Transport, Inventory, Motion, Waiting, Overproduction, Overprocessing, Defects.', en: 'Mnemonic for the 7 muda: Transport, Inventory, Motion, Waiting, Overproduction, Overprocessing, Defects.' } },
    { term: 'Overproduction', definition: { pt: 'Superprodução: produzir antes do necessário. O pior desperdício — gera os outros (estoque, espera, transporte).', en: 'Overproduction: making before it is needed. The worst waste — it generates the others (stock, waiting, transport).' } },
    { term: '5S', definition: { pt: 'Seiri (Sort), Seiton (Set in order), Seiso (Shine), Seiketsu (Standardize), Shitsuke (Sustain). Organiza espaço e fluxo.', en: 'Seiri (Sort), Seiton (Set in order), Seiso (Shine), Seiketsu (Standardize), Shitsuke (Sustain). Organizes space and flow.' } },
    { term: 'Kaizen', definition: { pt: 'Melhoria contínua e incremental, por todos, todo dia. Fundação da qualidade no lean.', en: 'Continuous, incremental improvement, by everyone, every day. A quality foundation of lean.' } },
    { term: 'Heijunka', definition: { pt: 'Nivelamento/balanceamento da produção (mix e volume) para evitar picos e combater a mura. Usa a "heijunka box".', en: 'Levelling/balancing of production (mix and volume) to avoid spikes and fight mura. Uses the "heijunka box".' } },
    { term: 'SMED', definition: { pt: 'Single-Minute Exchange of Die (Shingo): troca rápida de ferramenta. Viabiliza set-ups baratos e lotes pequenos.', en: 'Single-Minute Exchange of Die (Shingo): rapid tool changeover. Makes cheap set-ups and small batches viable.' } },
    { term: 'One-piece flow', definition: { pt: 'Fluxo peça a peça, sem lotes nem acúmulo entre estações. O ideal do fluxo lean.', en: 'One-piece-at-a-time flow, no batches or build-up between stations. Lean\'s flow ideal.' } },
    { term: 'Sand cone principle', definition: { pt: 'Ordem de construção das capacidades: qualidade → confiabilidade → velocidade → flexibilidade → eficiência.', en: 'Order of building capabilities: quality → dependability → speed → flexibility → efficiency.' } },
    { term: 'Anorexic lean', definition: { pt: 'Lean levado ao extremo, sem folga: fica frágil a interrupções (exposto na COVID-19).', en: 'Lean taken to the extreme, with no slack: fragile to disruption (exposed by COVID-19).' } },
    { term: 'Two-bin system', definition: { pt: 'Implementação visual do kanban/pull: pede-se quando a 1ª caixa esvazia (também visto na Semana 7).', en: 'Visual implementation of kanban/pull: order when the 1st bin empties (also seen in Week 7).' } }
  ],
  connections: [
    { week: 7, reason: { pt: 'O lean é o caso extremo da gestão de estoque da Semana 7: buscar estoque quase zero puxando pela demanda real (o oposto do MRP, que empurra).', en: 'Lean is the extreme case of Week 7\'s inventory management: aiming for near-zero stock by pulling from real demand (the opposite of MRP, which pushes).' } },
    { week: 6, reason: { pt: 'Push vs pull retoma o ponto de desacoplamento da Semana 6; o JIT é pull puro, e depende de fornecedores confiáveis (lead times curtos).', en: 'Push vs pull revisits Week 6\'s decoupling point; JIT is pure pull, and depends on reliable suppliers (short lead times).' } },
    { week: 9, reason: { pt: 'A qualidade é a fundação do lean (cone de areia). A Semana 9 (Gestão da Qualidade) aprofunda como conseguir "zero defeitos".', en: 'Quality is the foundation of lean (sand cone). Week 9 (Quality Management) goes deeper into achieving "zero defects".' } },
    { week: 4, reason: { pt: 'O fluxo e a linha móvel (Boeing) conectam com o Design de Processos (Semana 4): tipos de processo e layout.', en: 'Flow and the moving line (Boeing) connect to Process Design (Week 4): process types and layout.' } }
  ],
  flashcards: [
    { q: { pt: 'O que é produção enxuta (lean) / just-in-time?', en: 'What is lean production / just-in-time?' }, a: { pt: 'Produzir e entregar exatamente o necessário, na quantidade e momento certos, buscando estoque quase zero, entrega rápida, qualidade quase perfeita e custo baixo. Criado pela Toyota (TPS).', en: 'Producing and delivering exactly what is needed, in the right quantity and moment, aiming for near-zero stock, fast delivery, near-perfect quality and low cost. Created by Toyota (TPS).' } },
    { q: { pt: 'Qual a diferença entre empurrar (push) e puxar (pull)?', en: 'What is the difference between push and pull?' }, a: { pt: 'Push: um plano central (MRP) programa por previsão e empurra o material adiante. Pull: a demanda real dispara — a última estação responde primeiro e puxa das anteriores. Lean é pull.', en: 'Push: a central plan (MRP) schedules from forecast and pushes material forward. Pull: real demand triggers — the last station responds first and pulls from earlier ones. Lean is pull.' } },
    { q: { pt: 'O que é o kanban e como funciona no McDonald\'s?', en: 'What is the kanban and how does it work at McDonald\'s?' }, a: { pt: '"Sinal" (japonês) que dispara a produção no pull: caixa vazia/cartão = "produza mais". No McDonald\'s, é a bandeirinha metálica na fila de lanches; ao chegar à frente, volta à cozinha pedindo mais.', en: '"Signal" (Japanese) that triggers production in pull: empty box/card = "make more". At McDonald\'s, it is the metal flag in the row of burgers; on reaching the front, it goes back to the kitchen for more.' } },
    { q: { pt: 'Cite os 7 desperdícios muda (mnemônico TIMWOOD).', en: 'Name the 7 muda wastes (TIMWOOD mnemonic).' }, a: { pt: 'Transporte, Inventory (estoque), Motion (movimento), Waiting (espera), Overproduction (superprodução), Overprocessing (superprocessamento), Defects (defeitos). A superprodução é o pior.', en: 'Transport, Inventory, Motion, Waiting, Overproduction, Overprocessing, Defects. Overproduction is the worst.' } },
    { q: { pt: 'O que são muda, muri e mura?', en: 'What are muda, muri and mura?' }, a: { pt: 'Os 3 tipos de desperdício de Ohno: muda = não agrega valor; muri = sobrecarga; mura = irregularidade/desnivelamento. Um sistema desnivelado (mura) gera sobrecarga (muri) que gera desperdício (muda).', en: 'Ohno\'s 3 types of waste: muda = non-value-adding; muri = overburden; mura = unevenness. An uneven system (mura) creates overburden (muri) which creates waste (muda).' } },
    { q: { pt: 'Quais são os 5S e qual o mais difícil?', en: 'What are the 5S and which is the hardest?' }, a: { pt: 'Seiri (Sort/utilização), Seiton (Set in order/organização), Seiso (Shine/limpeza), Seiketsu (Standardize/padronização), Shitsuke (Sustain/disciplina). O 5º, Sustain, é o mais difícil: sem disciplina, tudo volta ao caos.', en: 'Seiri (Sort), Seiton (Set in order), Seiso (Shine), Seiketsu (Standardize), Shitsuke (Sustain). The 5th, Sustain, is the hardest: without discipline, everything returns to chaos.' } },
    { q: { pt: 'Por que o lean é descrito como um "sistema inteiro"?', en: 'Why is lean described as a "whole system"?' }, a: { pt: 'Porque todos os seus elementos (fluxo, qualidade, fornecedores, funcionários, set-ups, produto) são necessários e só funcionam juntos. Copiar só um pedaço (ex: só o kanban) faz a implementação falhar.', en: 'Because all its elements (flow, quality, suppliers, employees, set-ups, product) are needed and only work together. Copying just one piece (e.g. only kanban) makes the implementation fail.' } },
    { q: { pt: 'O que diz o princípio do cone de areia (sand cone)?', en: 'What does the sand cone principle say?' }, a: { pt: 'As capacidades constroem-se em ordem: qualidade → confiabilidade → velocidade → flexibilidade → eficiência. Por isso a qualidade é a base do lean.', en: 'Capabilities are built in order: quality → dependability → speed → flexibility → efficiency. That is why quality is the foundation of lean.' } },
    { q: { pt: 'Quais são os limites do lean, expostos pela COVID-19?', en: 'What are the limits of lean, exposed by COVID-19?' }, a: { pt: 'O lean levado ao extremo ("anoréxico") fica frágil: sem folga de estoque, qualquer interrupção para tudo. A pandemia quebrou cadeias enxutas demais. A saída é equilibrar eficiência com resiliência, não abandonar o lean.', en: 'Lean taken to the extreme ("anorexic") becomes fragile: with no stock slack, any disruption stops everything. The pandemic broke over-lean chains. The answer is to balance efficiency with resilience, not abandon lean.' } },
    { q: { pt: 'Por que a produção da Toyota é mais eficiente que a de Ford?', en: 'Why is Toyota\'s production more efficient than Ford\'s?' }, a: { pt: 'Ford empurra grandes lotes padronizados por previsão (acumula estoque, esconde defeitos, é rígido). A Toyota puxa pela demanda real com kanban, eliminando desperdício e estoque — mais flexível e enxuto.', en: 'Ford pushes large standardized batches from forecast (piles up stock, hides defects, is rigid). Toyota pulls by real demand with kanban, eliminating waste and stock — more flexible and lean.' } },
    { q: { pt: 'Como o lean se relaciona com a sustentabilidade?', en: 'How does lean relate to sustainability?' }, a: { pt: 'A meta do lean (mesma saída com menos entradas, cortando desperdício) reduz material, energia e refugo, o que combina com a sustentabilidade. Mas não é automático — depende de como é implementado.', en: 'Lean\'s goal (same output with fewer inputs, cutting waste) reduces material, energy and scrap, which fits sustainability. But it is not automatic — it depends on how it is implemented.' } }
  ],
  links: [
    { title: 'How Toyota changed the way we make things', url: 'https://www.youtube.com/results?search_query=how+toyota+changed+the+way+we+make+things', type: 'video', description: { pt: 'Como a Toyota desenvolveu o sistema JIT/lean — e por que é mais eficiente que o de Ford.', en: 'How Toyota developed the JIT/lean system — and why it is more efficient than Ford\'s.' } },
    { title: 'McDonald\'s was the first lean service organisation? (Magalhães, LinkedIn 2017)', url: 'https://www.linkedin.com/', type: 'article', description: { pt: 'A jornada do McDonald\'s até o sistema "made-for-you" (JIT em serviço).', en: 'McDonald\'s journey to the "made-for-you" system (JIT in service).' } },
    { title: 'A moving journey: the 777 moving line (Boeing)', url: 'https://www.boeing.com/', type: 'video', description: { pt: 'A abordagem de fluxo da Boeing na montagem do 777 — princípios lean na aviação (comparar com a Fig. 10.4).', en: 'Boeing\'s flow approach in assembling the 777 — lean principles in aviation (compare with Fig. 10.4).' } },
    { title: 'The machine that ran too hot (The Economist, 2010)', url: 'https://www.economist.com/', type: 'news', description: { pt: 'A cadeia esticada demais da Toyota e os recalls — os limites do lean.', en: 'Toyota\'s overstretched supply chain and the recalls — the limits of lean.' } },
    { title: 'The end of just-in-time? (Hadwick, Reuters Events 2020)', url: 'https://www.reutersevents.com/supplychain', type: 'article', description: { pt: 'O lean "anoréxico" e a fragilidade das cadeias durante a COVID-19: problema ou solução?', en: 'Anorexic lean and supply chain fragility during COVID-19: problem or solution?' } }
  ],
  notes: {
    pt: `═══ VISÃO GERAL ═══
Lean = caso extremo da gestão de estoque (Semana 7): estoque quase zero, entrega rápida, qualidade quase perfeita, custo baixo. Criado pela Toyota (TPS) como resposta melhor que a produção em massa de Ford. Duas ideias: PUXAR (não empurrar) e ELIMINAR DESPERDÍCIO. ⚠️ É um sistema INTEIRO — falha se você copiar só um pedaço.

═══ EMPURRAR vs PUXAR (Figuras 10.1/10.2) ═══
• Push (empurrar): plano central (MRP/ERP, Semana 7) programa por previsão e empurra o material linha abaixo. Acumula estoque se errar a previsão.
• Pull (puxar): nada se produz até um pedido real. A ÚLTIMA estação responde primeiro e puxa material das anteriores, de trás para frente. Lean é pull. (Ex: banco "puxa" a produção de cartões ao abrir conta.)
Push ou pull = apenas COMO a produção é iniciada.

═══ KANBAN (Figura 10.3) ═══
"Sinal/placa" (japonês). Técnica da Toyota que faz o pull acontecer: caixa vazia, cartão ou espaço demarcado que diz "produza mais". Sem sinal = há estoque, não produz. Caixa cheia = para. No McDonald\'s: a bandeirinha metálica na fila de lanches — ao chegar à frente, volta à cozinha pedindo mais.

═══ DESPERDÍCIO: MUDA, MURI, MURA (Ohno 1988) ═══
• Muda: trabalho que não agrega valor (o foco principal).
• Muri: sobrecarga (esforço/tensão excessivos por design ruim).
• Mura: irregularidade/desnivelamento da produção.
Os 3 se alimentam: mura → muri → muda. Nivelar (heijunka) ataca a raiz.

═══ OS 7 DESPERDÍCIOS MUDA (mnemônico TIMWOOD) ═══
1. Transport — mover produtos não agrega valor.
2. Inventory (estoque) — produto parado; esconde problemas, gera obsolescência.
3. Motion (movimento) — pessoas/equipamentos se movendo à toa.
4. Waiting (espera) — tempo ocioso.
5. Overproduction (superprodução) — produzir antes do necessário. O PIOR: gera os outros.
6. Overprocessing — usar equipamento complexo/caro demais para a tarefa. (Toyota usa a máquina mais simples que serve.)
7. Defects (defeitos) — inspecionar e corrigir não agrega valor.
+ 8º (Womack): subutilizar o talento das pessoas (ex: advogado treinado numa tarefa trivial).

═══ 5S — ORGANIZAÇÃO (aplica a produção E serviços) ═══
1. Seiri (Sort/Utilização): remover o desnecessário.
2. Seiton (Set in order/Organização): lugar demarcado para cada coisa (chão pintado, áreas marcadas).
3. Seiso (Shine/Limpeza): manter limpo; orgulho e ordem.
4. Seiketsu (Standardize/Padronização): melhores práticas compartilhadas.
5. Shitsuke (Sustain/Disciplina): manter os outros 4 — o mais difícil e o mais importante.

═══ O SISTEMA LEAN INTEIRO (Figura 10.4) ═══
Todos os elementos são necessários e só funcionam JUNTOS (por isso muitas implementações falham). Os 6 elementos ao redor do Sistema Lean:
• Fluxo: JIT, kanban, produção balanceada.
• Controle de qualidade: alta qualidade, kaizen.
• Cuidado com o produto: design adequado, marketing conforme o plano.
• Envolvimento dos funcionários: senioridade, trabalho em equipe.
• Trabalho com fornecedores: lead times curtos, relações de longo prazo.
• Foco em set-ups: baixo custo e tempo de preparação (SMED, Shingo).
No centro: a QUALIDADE (princípio do cone de areia: qualidade → confiabilidade → velocidade → flexibilidade → eficiência).

═══ LEAN EM SERVIÇOS ═══
McDonald\'s (made-for-you, kanban da bandeirinha), hospitais (5S e redução de desperdício — Washington Hospital, Harvard Vanguard), Boeing (linha móvel do 777, fluxo). Prova que o lean vai além da fábrica.

═══ LIMITES DO LEAN ═══
Lean "anoréxico" (over-lean) = frágil. A COVID-19 expôs cadeias enxutas demais que quebraram → debate "o fim do just-in-time?". Toyota "máquina que rodou quente demais" (Economist 2010): cadeia esticada + recalls. Saída: equilibrar EFICIÊNCIA com RESILIÊNCIA. Lean & Green: cortar desperdício ajuda a sustentabilidade, mas não é automático.

═══ RESUMO DA SEMANA ═══
Descrevemos a produção enxuta como caso especial da gestão de estoque/produção, que não serve para toda situação. Vimos que o lean depende de várias fundações que só funcionam juntas — entender por que TODAS são necessárias é essencial. Uma fundação-chave é atingir alta consistência sem erros: a qualidade, tema aprofundado na próxima semana.

═══ FONTES ═══

📖 Ebook — EBOOK_ Operations Management 2_e.pdf (Paton, Clegg, Hsuan & Pilkington), Capítulo 10
   → pp. 322–330 (natureza do lean/JIT; push vs pull Figs. 10.1/10.2; kanban Fig. 10.3 + exemplo McDonald\'s; JIT como pull, outros nomes do lean)
   → pp. 331–347 (foco em valor e redução de desperdício; muda/muri/mura + os 7 muda de Ohno + 8º de Womack; elementos do sistema lean Fig. 10.4; princípio do cone de areia; heijunka box Fig. 10.5; 5S; híbrido JIT-MRP Fig. 10.6)

📊 Figura 10.4 (elementos do sistema lean) — lida como imagem, base para a visualização "Elementos do Sistema Lean" (leanElements)
📊 Muda/7 desperdícios (Ohno, p.723-725) — base para a visualização "Os 7 Desperdícios" (sevenWastes)
📊 5S (p.739) — base para a visualização "Framework 5S" (fiveS)
📊 Figuras 10.2/10.3 (push-pull + kanban) — base para a visualização "Empurrar vs Puxar & o Kanban" (kanbanPull)

🎬 Materiais do curso (Coursera, Week 8): vídeo/artigo Toyota JIT (Tatourian, Life of Learning 2018); two-bin/Latest Quality; McDonald\'s made-for-you (Magalhães, LinkedIn 2017; Chmura, Fox 13 News 2014; assembly of a cheeseburger); Boeing 777 moving line (Gates, Seattle Times 2015; Fig. 10.4); lean healthcare (Washington Hospital; AMA 2016); Toyota "ran too hot" (The Economist 394/8671, 2010); lean & sustainability (Gemba Academy, Keivan Zokaei); limits to lean (CNA; Hadwick, Reuters Events 2020). Further reading: Hines/Holweg/Rich (2004); Pilkington (1998).

📝 Conteúdo estruturado a partir das telas do curso enviadas pelo usuário + leitura do ebook (Capítulo 10, pp. 322–347).`,
    en: `═══ OVERVIEW ═══
Lean = the extreme case of inventory management (Week 7): near-zero stock, fast delivery, near-perfect quality, low cost. Created by Toyota (TPS) as a better answer than Ford\'s mass production. Two ideas: PULL (don\'t push) and ELIMINATE WASTE. ⚠️ It is a WHOLE system — it fails if you copy just one piece.

═══ PUSH vs PULL (Figures 10.1/10.2) ═══
• Push: a central plan (MRP/ERP, Week 7) schedules from forecast and pushes material down the line. Piles up stock if the forecast is wrong.
• Pull: nothing is made until a real order. The LAST station responds first and pulls material from earlier ones, back to front. Lean is pull. (E.g. a bank "pulls" card production when an account is opened.)
Push or pull = purely HOW production is initiated.

═══ KANBAN (Figure 10.3) ═══
"Signal/signpost" (Japanese). A Toyota technique that makes pull happen: an empty box, card or marked space that says "make more". No signal = there is stock, don\'t produce. Full box = stop. At McDonald\'s: the metal flag in the row of burgers — on reaching the front, it goes back to the kitchen for more.

═══ WASTE: MUDA, MURI, MURA (Ohno 1988) ═══
• Muda: non-value-adding work (the main focus).
• Muri: overburden (excessive effort/strain from poor design).
• Mura: unevenness/imbalance in production.
The 3 feed each other: mura → muri → muda. Levelling (heijunka) attacks the root.

═══ THE 7 MUDA WASTES (TIMWOOD mnemonic) ═══
1. Transport — moving products adds no value.
2. Inventory — idle product; hides problems, causes obsolescence.
3. Motion — people/equipment moving needlessly.
4. Waiting — idle time.
5. Overproduction — making before it is needed. The WORST: it generates the others.
6. Overprocessing — using equipment too complex/expensive for the task. (Toyota uses the simplest machine that works.)
7. Defects — inspecting and fixing adds no value.
+ 8th (Womack): underusing people\'s talent (e.g. a trained lawyer on a trivial task).

═══ 5S — ORGANIZATION (applies to production AND services) ═══
1. Seiri (Sort): remove the unnecessary.
2. Seiton (Set in order): a marked place for everything (painted floors, marked areas).
3. Seiso (Shine): keep clean; pride and order.
4. Seiketsu (Standardize): shared best practices.
5. Shitsuke (Sustain): keep the other 4 going — the hardest and most important.

═══ THE WHOLE LEAN SYSTEM (Figure 10.4) ═══
All elements are needed and only work TOGETHER (which is why many implementations fail). The 6 elements around the Lean System:
• Flow: JIT, kanban, balanced production.
• Quality control: high quality, kaizen.
• Product stewardship: suitable design, marketing to plans.
• Employee involvement: seniority, teamwork.
• Working with suppliers: short lead times, long-term relationships.
• Focus on set-ups: low set-up cost and time (SMED, Shingo).
At the centre: QUALITY (sand cone principle: quality → dependability → speed → flexibility → efficiency).

═══ LEAN IN SERVICES ═══
McDonald\'s (made-for-you, the flag kanban), hospitals (5S and waste reduction — Washington Hospital, Harvard Vanguard), Boeing (777 moving line, flow). It proves lean goes beyond the factory.

═══ LIMITS OF LEAN ═══
"Anorexic" lean (over-lean) = fragile. COVID-19 exposed over-lean chains that broke → the "end of just-in-time?" debate. Toyota "machine that ran too hot" (Economist 2010): overstretched chain + recalls. The answer: balance EFFICIENCY with RESILIENCE. Lean & Green: cutting waste helps sustainability, but not automatically.

═══ WEEK SUMMARY ═══
We described lean production as a special case of inventory/production management that doesn\'t fit every situation. We saw that lean relies on several foundations that only work together — understanding why ALL are needed is essential. One key foundation is achieving high consistency with no mistakes: quality, covered in depth next week.

═══ SOURCES ═══

📖 Ebook — EBOOK_ Operations Management 2_e.pdf (Paton, Clegg, Hsuan & Pilkington), Chapter 10
   → pp. 322–330 (nature of lean/JIT; push vs pull Figs. 10.1/10.2; kanban Fig. 10.3 + McDonald\'s example; JIT as pull, other names for lean)
   → pp. 331–347 (focus on value and waste reduction; muda/muri/mura + Ohno\'s 7 muda + Womack\'s 8th; elements of the lean system Fig. 10.4; sand cone principle; heijunka box Fig. 10.5; 5S; hybrid JIT-MRP Fig. 10.6)

📊 Figure 10.4 (elements of the lean system) — read as an image, basis for the "Elements of the Lean System" visualization (leanElements)
📊 Muda/7 wastes (Ohno, p.723-725) — basis for the "The 7 Wastes" visualization (sevenWastes)
📊 5S (p.739) — basis for the "5S Framework" visualization (fiveS)
📊 Figures 10.2/10.3 (push-pull + kanban) — basis for the "Push vs Pull & the Kanban" visualization (kanbanPull)

🎬 Course materials (Coursera, Week 8): Toyota JIT video/article (Tatourian, Life of Learning 2018); two-bin/Latest Quality; McDonald\'s made-for-you (Magalhães, LinkedIn 2017; Chmura, Fox 13 News 2014; assembly of a cheeseburger); Boeing 777 moving line (Gates, Seattle Times 2015; Fig. 10.4); lean healthcare (Washington Hospital; AMA 2016); Toyota "ran too hot" (The Economist 394/8671, 2010); lean & sustainability (Gemba Academy, Keivan Zokaei); limits to lean (CNA; Hadwick, Reuters Events 2020). Further reading: Hines/Holweg/Rich (2004); Pilkington (1998).

📝 Content structured from the course screens sent by the user + ebook reading (Chapter 10, pp. 322–347).`
  }
};
