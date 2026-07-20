window.WEEKS_DATA = window.WEEKS_DATA || {};
window.WEEKS_DATA['operations-management'] = window.WEEKS_DATA['operations-management'] || {};
window.WEEKS_DATA['operations-management'][7] = {
  week: 7,
  status: 'not-started',
  title: { pt: 'Gestão de Estoque', en: 'Inventory Management' },
  overview: {
    pt: 'Numa fábrica, a compra de materiais chega a 70% das despesas totais — então gerenciar estoque é gerenciar dinheiro. A regra prática: ter o MÍNIMO de estoque possível, mas sem faltar. Toda a semana gira em torno de pesar um risco contra o outro: o custo de faltar material (stock-out) versus o custo de ter demais (holding). E tudo se resume a responder duas perguntas: QUANTO pedir e QUANDO pedir. As ferramentas: o EOQ (lote econômico) responde "quanto"; os sistemas Q (quantidade fixa) e P (período fixo) respondem "quando"; a análise ABC diz onde focar; e quando a demanda é previsível (dependente), o MRP planeja os materiais com precisão. Vemos também a logística reversa (reciclagem, devoluções).',
    en: 'In a factory, buying materials can be 70% of total expenses — so managing inventory is managing money. The practical rule: hold as LITTLE stock as possible, but never run out. The whole week weighs one risk against another: the cost of running out (stock-out) versus the cost of holding too much. And it all comes down to two questions: HOW MUCH to order and WHEN to order. The tools: EOQ (economic order quantity) answers "how much"; the Q (fixed quantity) and P (fixed period) systems answer "when"; ABC analysis says where to focus; and when demand is predictable (dependent), MRP plans materials precisely. We also cover reverse logistics (recycling, returns).'
  },
  concepts: [
    {
      pt: 'Estoque (Inventory) e seus tipos',
      en: 'Inventory and its types',
      definition: {
        pt: 'Todo material parado esperando ser usado ou vendido. Três tipos básicos: matéria-prima (raw materials), material em processo (work-in-progress, WIP) e produto acabado (finished goods). Inclui casos críticos como sangue num banco de sangue, onde faltar tem consequência grave.',
        en: 'Any material sitting idle waiting to be used or sold. Three basic types: raw materials, work-in-progress (WIP) and finished goods. It includes critical cases like blood in a blood bank, where running out has serious consequences.'
      }
    },
    {
      pt: 'O Trade-off do Estoque (equilíbrio de risco)',
      en: 'The Inventory Trade-off (balancing risk)',
      definition: {
        pt: 'Gerir estoque é pesar dois custos opostos: o custo de FALTAR (stock-out — para a produção, perde venda, perde cliente) contra o custo de ter DEMAIS (dinheiro parado, armazenagem, obsolescência). A meta é o mínimo de estoque sem nunca romper.',
        en: 'Managing inventory means weighing two opposing costs: the cost of RUNNING OUT (stock-out — halts production, lost sales, lost customers) against the cost of holding TOO MUCH (tied-up cash, storage, obsolescence). The goal is minimum stock without ever running out.'
      }
    },
    {
      pt: 'Custo de Manutenção (Holding / Stockholding Cost)',
      en: 'Holding / Stockholding Cost',
      definition: {
        pt: 'Custo de guardar estoque: luz, calor, segurança, espaço e, principalmente, o JURO do dinheiro emprestado para comprá-lo. Sobe quanto mais se pede de uma vez. Empurra para lotes pequenos. Ex: sorvete no freezer custa mais que biscoito para manter.',
        en: 'The cost of keeping stock: light, heat, security, space and, above all, the INTEREST on the money borrowed to buy it. It rises the more you order at once. It pushes toward small batches. E.g. ice cream in the freezer costs more to hold than biscuits.'
      }
    },
    {
      pt: 'Custo de Pedido (Ordering / Set-up Cost)',
      en: 'Ordering / Set-up Cost',
      definition: {
        pt: 'Custo fixo de processar cada pedido: seleção, embalagem, transporte, ou o tempo de preparação (set-up) de uma máquina que fica parada. Como é fixo por pedido, empurra para lotes GRANDES (pedir muito de uma vez dilui o custo por item).',
        en: 'The fixed cost of processing each order: selection, packaging, transport, or a machine\'s set-up time while it sits idle. Being fixed per order, it pushes toward LARGE batches (ordering a lot at once dilutes the cost per item).'
      }
    },
    {
      pt: 'Demanda Independente vs Dependente',
      en: 'Independent vs Dependent Demand',
      definition: {
        pt: 'Demanda independente é imprevisível, vem do mercado (quantos clientes vão comprar?) — usa EOQ/ROL. Demanda dependente deriva de outra: se você vai montar 100 tratores, precisa de exatamente 400 rodas — dá para calcular e planejar (é o que o MRP faz).',
        en: 'Independent demand is unpredictable, coming from the market (how many customers will buy?) — it uses EOQ/ROL. Dependent demand derives from another: if you will build 100 tractors, you need exactly 400 wheels — it can be calculated and planned (which is what MRP does).'
      }
    },
    {
      pt: 'Lote Econômico de Compra (EOQ)',
      en: 'Economic Order Quantity (EOQ)',
      definition: {
        pt: 'A quantidade fixa a pedir que MINIMIZA o custo total anual (custo de manutenção + custo de pedido). Fica no fundo da curva de custo total, onde as duas forças se equilibram. Fórmula: Q = √(2·D·Cs / Ch). Pedir mais OU menos que o EOQ custa mais no total.',
        en: 'The fixed quantity to order that MINIMIZES total annual cost (holding cost + ordering cost). It sits at the bottom of the total-cost curve, where the two forces balance. Formula: Q = √(2·D·Cs / Ch). Ordering more OR less than the EOQ costs more overall.'
      }
    },
    {
      pt: 'Ponto de Ressuprimento (Reorder Level, ROL)',
      en: 'Reorder Level (ROL) / Reorder Point',
      definition: {
        pt: 'O nível de estoque que dispara um novo pedido. Quando o estoque cai até a "linha", pede-se um lote (normalmente o EOQ). Deixa material suficiente para durar até a entrega chegar. Implementado às vezes como "sistema de duas caixas" (two-bin).',
        en: 'The stock level that triggers a new order. When stock drops to the "line", a batch (usually the EOQ) is ordered. It leaves enough material to last until the delivery arrives. Sometimes implemented as the "two-bin system".'
      }
    },
    {
      pt: 'Estoque de Segurança (Safety Stock)',
      en: 'Safety Stock',
      definition: {
        pt: 'Estoque extra para cobrir incertezas na demanda ou no tempo de entrega (lead time). Quanto mais safety stock, menor a chance de faltar — mas maior o custo de manutenção. Vale ser generoso se o custo de faltar for alto (ex: caixas de câmbio numa fábrica de carros).',
        en: 'Extra stock to cover uncertainty in demand or delivery time (lead time). The more safety stock, the lower the chance of running out — but the higher the holding cost. It pays to be generous if the stock-out cost is high (e.g. gearboxes in a car factory).'
      }
    },
    {
      pt: 'Sistema Q (Quantidade Fixa / ROL)',
      en: 'Q-System (Fixed Quantity / ROL)',
      definition: {
        pt: 'Pede-se sempre a MESMA quantidade (o EOQ), mas em intervalos IRREGULARES — o gatilho é o estoque atingir o ROL. Exige monitorar o estoque o tempo todo (ex: código de barras, two-bin). A QUANTIDADE é fixa; o QUANDO é a decisão.',
        en: 'You always order the SAME quantity (the EOQ), but at IRREGULAR intervals — the trigger is stock hitting the ROL. It requires monitoring stock continuously (e.g. barcodes, two-bin). The QUANTITY is fixed; the WHEN is the decision.'
      }
    },
    {
      pt: 'Sistema P (Período Fixo / Revisão Cíclica)',
      en: 'P-System (Fixed Period / Cyclical Review)',
      definition: {
        pt: 'Revisa-se o estoque em intervalos FIXOS (ex: toda segunda) e pede-se o quanto falta para voltar a um nível-alvo — então a QUANTIDADE varia a cada vez. Vantagem: não precisa de monitoramento contínuo caro. O QUANDO é fixo; a QUANTIDADE é a decisão.',
        en: 'You review stock at FIXED intervals (e.g. every Monday) and order however much is needed to return to a target level — so the QUANTITY varies each time. Advantage: no costly continuous monitoring. The WHEN is fixed; the QUANTITY is the decision.'
      }
    },
    {
      pt: 'Análise ABC (Pareto)',
      en: 'ABC Analysis (Pareto)',
      definition: {
        pt: 'Classifica os itens pelo valor de uso anual (quanto custa × quanto se usa). Classe A: ~10% dos itens, ~80% do gasto — controlar de perto. Classe C: ~60% dos itens, ~5% do gasto — controle superficial. Foca a atenção onde o dinheiro está.',
        en: 'Classifies items by annual usage value (unit cost × quantity used). Class A: ~10% of items, ~80% of spend — control closely. Class C: ~60% of items, ~5% of spend — cursory control. It focuses attention where the money is.'
      }
    },
    {
      pt: 'Planejamento de Necessidades de Material (MRP)',
      en: 'Material Requirements Planning (MRP)',
      definition: {
        pt: 'Sistema (computadorizado) que usa a demanda dependente para planejar materiais. Usa 3 entradas: o Plano Mestre de Produção (MPS — o que produzir e quando), a Lista de Materiais (BOM — a "receita" do produto) e os registros de estoque. Sai um plano de o que pedir, quanto e quando.',
        en: 'A (computerized) system that uses dependent demand to plan materials. It takes 3 inputs: the Master Production Schedule (MPS — what to make and when), the Bill of Materials (BOM — the product\'s "recipe") and inventory records. It outputs a plan of what to order, how much and when.'
      }
    },
    {
      pt: 'Lista de Materiais (Bill of Materials, BOM)',
      en: 'Bill of Materials (BOM)',
      definition: {
        pt: 'A "receita" ou árvore do produto: lista toda peça e submontagem necessária, com as quantidades e como se encaixam. É uma das 3 entradas do MRP. Ex: uma chaleira = corpo + resistência + tampa + cabo + …, cada um com sua quantidade.',
        en: 'The product\'s "recipe" or tree: it lists every part and sub-assembly needed, with quantities and how they fit. It is one of MRP\'s 3 inputs. E.g. a kettle = body + element + lid + handle + …, each with its quantity.'
      }
    },
    {
      pt: 'Planejamento de Recursos Empresariais (ERP)',
      en: 'Enterprise Resource Planning (ERP)',
      definition: {
        pt: 'Evolução do MRP para toda a empresa: um sistema corporativo com banco de dados central que integra produção, finanças, compras, RH e vendas. Aplicável também a serviços. Líderes de mercado: SAP, Oracle. Implementar é caro e arriscado (muitos fracassos famosos).',
        en: 'The evolution of MRP for the whole firm: a corporate system with a central database integrating production, finance, purchasing, HR and sales. Also applicable to services. Market leaders: SAP, Oracle. Implementing it is costly and risky (many famous failures).'
      }
    },
    {
      pt: 'Logística Reversa (Reverse Logistics)',
      en: 'Reverse Logistics',
      definition: {
        pt: 'O fluxo INVERSO da cadeia: trazer produtos de volta do cliente para inspeção, reciclagem, recondicionamento ou remanufatura. Mais difícil de gerenciar que a logística "para frente" (quantidades e condições imprevisíveis). Ex: Nespresso (cápsulas), Kodak (câmeras descartáveis).',
        en: 'The REVERSE flow of the chain: bringing products back from the customer for inspection, recycling, reconditioning or remanufacturing. Harder to manage than "forward" logistics (unpredictable quantities and conditions). E.g. Nespresso (capsules), Kodak (single-use cameras).'
      }
    }
  ],
  theories: [
    {
      name: { pt: 'Lote Econômico de Compra (EOQ)', en: 'Economic Order Quantity (EOQ)' },
      authors: ['Harris'],
      year: '1913',
      renderer: 'eoqModel',
      description: {
        pt: 'O EOQ acha o "quanto pedir" que minimiza o custo total anual. Duas forças puxam em direções opostas: o custo de manutenção (holding) sobe com o tamanho do lote (mais material parado), e o custo de pedido (ordering) cai com o tamanho do lote (menos pedidos por ano). O custo total é a soma dos dois — uma curva em U. O fundo dessa curva é o EOQ, e acontece exatamente onde o custo de manutenção anual iguala o custo de pedido anual. Fórmula: Q = √(2·D·Cs / Ch), onde D = demanda anual, Cs = custo por pedido, Ch = custo de manter uma unidade por ano. A equação é robusta: um erro de 50% numa estimativa muda o EOQ em só ~30%. Use a calculadora ao lado (padrão = exemplo do livro, a loja CCS).',
        en: 'EOQ finds the "how much to order" that minimizes total annual cost. Two forces pull in opposite directions: holding cost rises with batch size (more idle stock), and ordering cost falls with batch size (fewer orders per year). Total cost is their sum — a U-shaped curve. The bottom of that curve is the EOQ, and it happens exactly where annual holding cost equals annual ordering cost. Formula: Q = √(2·D·Cs / Ch), where D = annual demand, Cs = cost per order, Ch = cost to hold one unit per year. The equation is robust: a 50% error in an estimate shifts the EOQ by only ~30%. Use the calculator (default = the textbook CCS store example).'
      }
    },
    {
      name: { pt: 'Sistema Q vs Sistema P', en: 'Q-System vs P-System' },
      authors: [],
      year: '',
      renderer: 'qpSystems',
      description: {
        pt: 'As duas grandes famílias de controle de estoque respondem a "quando pedir" de jeitos opostos. No Sistema Q (quantidade fixa / reorder level): você pede sempre a mesma quantidade (o EOQ), disparada quando o estoque bate no ponto de ressuprimento (ROL) — intervalos irregulares. Precisa monitorar o estoque o tempo todo. No Sistema P (período fixo / revisão cíclica): você revisa em datas fixas e pede o quanto falta para voltar ao nível-alvo — quantidade variável, sem precisar de monitoramento contínuo. Regra de memória: Q = Quantidade fixa, P = Período fixo. O estoque de segurança (safety stock) protege os dois contra atrasos e variação da demanda.',
        en: 'The two big families of inventory control answer "when to order" in opposite ways. In the Q-System (fixed quantity / reorder level): you always order the same amount (the EOQ), triggered when stock hits the reorder level (ROL) — irregular intervals. It needs continuous stock monitoring. In the P-System (fixed period / cyclical review): you review at fixed dates and order however much brings you back to a target level — variable quantity, no continuous monitoring needed. Memory rule: Q = fixed Quantity, P = fixed Period. Safety stock protects both against delays and demand variation.'
      }
    },
    {
      name: { pt: 'MRP — Planejamento de Materiais', en: 'MRP — Material Requirements Planning' },
      authors: [],
      year: '',
      renderer: 'mrpTree',
      description: {
        pt: 'Quando a demanda é dependente (previsível a partir do produto final), não precisamos adivinhar — podemos CALCULAR exatamente os materiais. O MRP faz isso a partir de 3 entradas: (1) o Plano Mestre de Produção (MPS) — o que e quando produzir; (2) a Lista de Materiais (BOM) — a árvore do produto, cada peça e quantidade; (3) os registros de estoque — o que já temos. Cruzando os três, o MRP explode o produto em suas peças (backwards, do produto final para trás), desconta o que já há em estoque e gera o plano: o que pedir, quanto e quando. É quase sempre computadorizado. Evoluiu para MRP II (inclui capacidade) e ERP (empresa toda).',
        en: 'When demand is dependent (predictable from the final product), we don\'t need to guess — we can CALCULATE the materials exactly. MRP does this from 3 inputs: (1) the Master Production Schedule (MPS) — what and when to make; (2) the Bill of Materials (BOM) — the product tree, each part and quantity; (3) inventory records — what we already have. Crossing the three, MRP explodes the product into its parts (backwards, from final product), subtracts what is already in stock, and generates the plan: what to order, how much and when. It is almost always computerized. It evolved into MRP II (adds capacity) and ERP (the whole firm).'
      }
    },
    {
      name: { pt: 'Análise ABC (Princípio de Pareto)', en: 'ABC Analysis (Pareto Principle)' },
      authors: ['Pareto'],
      year: '',
      renderer: 'abcAnalysis',
      description: {
        pt: 'Nem todo item merece o mesmo esforço de controle. A análise ABC ordena os itens pelo valor de uso anual (custo unitário × quantidade usada) e os divide em três classes. Classe A: poucos itens (~10%) que valem quase tudo (~80% do gasto) — controlar de perto, com sistema preciso (código de barras, tempo real). Classe B: intermediários (~30% dos itens, ~15% do gasto). Classe C: muitos itens (~60%) que valem pouco (~5%) — controle superficial basta (ex: parafusos e porcas). É o princípio 80/20 aplicado ao estoque: foque onde o dinheiro está.',
        en: 'Not every item deserves the same control effort. ABC analysis ranks items by annual usage value (unit cost × quantity used) and splits them into three classes. Class A: few items (~10%) worth almost everything (~80% of spend) — control closely, with a precise system (barcodes, real-time). Class B: middling (~30% of items, ~15% of spend). Class C: many items (~60%) worth little (~5%) — cursory control is enough (e.g. bolts and nuts). It is the 80/20 principle applied to inventory: focus where the money is.'
      }
    }
  ],
  authors: [
    {
      name: 'Ford W. Harris',
      role: { pt: 'Engenheiro, criador da fórmula EOQ (1913)', en: 'Engineer, creator of the EOQ formula (1913)' },
      contribution: { pt: 'Derivou o Lote Econômico de Compra, uma das fórmulas mais duradouras da gestão de operações — ainda a base de praticamente todos os modelos de estoque.', en: 'Derived the Economic Order Quantity, one of the most enduring formulas in operations management — still the basis of virtually every inventory model.' }
    },
    {
      name: 'Vilfredo Pareto',
      role: { pt: 'Economista, origem do princípio 80/20', en: 'Economist, origin of the 80/20 principle' },
      contribution: { pt: 'O princípio de Pareto (poucos itens vitais respondem pela maior parte do valor) é a base da análise ABC de estoque.', en: 'The Pareto principle (a vital few items account for most of the value) underpins ABC inventory analysis.' }
    },
    {
      name: 'Joseph Orlicky',
      role: { pt: 'Pioneiro do MRP (IBM, anos 1960-70)', en: 'MRP pioneer (IBM, 1960s-70s)' },
      contribution: { pt: 'Sistematizou o MRP como método de planejamento de materiais baseado em demanda dependente, MPS e BOM — origem dos sistemas ERP modernos.', en: 'Systematized MRP as a material planning method based on dependent demand, MPS and BOM — the origin of modern ERP systems.' }
    }
  ],
  caseStudies: [
    {
      company: 'Serviço Nacional de Sangue (Escócia)',
      sector: { pt: 'Saúde — estoque crítico e perecível', en: 'Healthcare — critical, perishable inventory' },
      lesson: { pt: 'O sangue é um estoque crítico: faltar um tipo pode custar vidas, mas ele vence e os tipos só são intercambiáveis de formas específicas. Combina custo de manutenção (refrigeração, validade), custo de pedido (campanhas de doação) e custo de stock-out (gravíssimo). Diferente do McDonald\'s ficar sem batata: a consequência é de outra ordem.', en: 'Blood is a critical inventory: running out of a type can cost lives, yet it expires and types are only interchangeable in specific ways. It combines holding cost (refrigeration, shelf life), order cost (donation drives) and stock-out cost (severe). Unlike McDonald\'s running out of fries: the consequence is of another order.' }
    },
    {
      company: 'Corner Convenience Store (CCS)',
      sector: { pt: 'Varejo — exemplo trabalhado de EOQ', en: 'Retail — EOQ worked example' },
      lesson: { pt: 'Exemplo do livro: a CCS vende Light Cola a 860 latas/dia (250 dias/ano), custo de pedido $25, manutenção 10% de $1,20 o six-pack. EOQ = 3.864 caixas por pedido; ~9,3 pedidos/ano (a cada 39 dias); custo total do sistema $463,68/ano. Mostra o EOQ na prática — e que a calculadora ao lado reproduz esse número.', en: 'Textbook example: CCS sells Light Cola at 860 cans/day (250 days/year), order cost $25, holding 10% of $1.20 per six-pack. EOQ = 3,864 cases per order; ~9.3 orders/year (every 39 days); total system cost $463.68/year. It shows EOQ in practice — and the calculator reproduces this number.' }
    },
    {
      company: 'McDonald\'s',
      sector: { pt: 'Fast food — EOQ de refrigerante', en: 'Fast food — soft-drink EOQ' },
      lesson: { pt: 'Uma loja típica vende ~3.200 refrigerantes/dia. Com custo de pedido e taxa de manutenção de 10%, o EOQ dá ~26.000 unidades (≈ 8 dias de estoque), o que "parece sensível". Mostra que o EOQ funciona igual para uma multinacional e para a lojinha da esquina.', en: 'A typical store sells ~3,200 soft drinks/day. With an order cost and a 10% holding rate, the EOQ works out to ~26,000 units (≈ 8 days of stock), which "seems sensible". It shows EOQ works the same for a multinational as for the corner shop.' }
    },
    {
      company: 'Amazon',
      sector: { pt: 'E-commerce — sazonalidade de demanda', en: 'E-commerce — demand seasonality' },
      lesson: { pt: 'Na alta do Natal, a Amazon contrata milhares de trabalhadores sazonais (ex: +9.000 na Polônia em 2021) para dar conta do pico de demanda e da falta de mão de obra. Mostra o estoque de antecipação (anticipation stock) e a capacidade flexível como respostas à variação de demanda.', en: 'In the Christmas peak, Amazon hires thousands of seasonal workers (e.g. +9,000 in Poland in 2021) to cope with the demand spike and labour shortage. It shows anticipation stock and flexible capacity as responses to demand variation.' }
    },
    {
      company: 'Nespresso',
      sector: { pt: 'Café — logística reversa (reciclagem)', en: 'Coffee — reverse logistics (recycling)' },
      lesson: { pt: 'A Nespresso monta uma cadeia reversa para coletar e reciclar as cápsulas de alumínio usadas. Reciclar é mais difícil que a logística "para frente": as quantidades e condições dos retornos são imprevisíveis. O produto é adequado porque o alumínio é reciclável e a cápsula é padronizada.', en: 'Nespresso builds a reverse chain to collect and recycle used aluminium capsules. Recycling is harder than "forward" logistics: the quantities and conditions of returns are unpredictable. The product suits it because aluminium is recyclable and the capsule is standardized.' }
    },
    {
      company: 'Kodak',
      sector: { pt: 'Fotografia — remanufatura (logística reversa)', en: 'Photography — remanufacturing (reverse logistics)' },
      lesson: { pt: 'A Kodak reciclou mais de 310 milhões de câmeras e remanufatura suas câmeras descartáveis depois que o filme é revelado. Exemplo clássico de logística reversa que reduz custo e impacto ambiental ao reaproveitar o produto retornado.', en: 'Kodak recycled over 310 million cameras and remanufactures its single-use cameras after the film is developed. A classic reverse-logistics example that cuts cost and environmental impact by reusing the returned product.' }
    }
  ],
  glossary: [
    { term: 'Inventory', definition: { pt: 'Material parado esperando uso ou venda: matéria-prima, WIP e produto acabado.', en: 'Idle material awaiting use or sale: raw materials, WIP and finished goods.' } },
    { term: 'WIP', definition: { pt: 'Work-in-Progress — material em processo, entre a matéria-prima e o produto acabado.', en: 'Work-in-Progress — material being processed, between raw material and finished goods.' } },
    { term: 'EOQ', definition: { pt: 'Economic Order Quantity — quantidade fixa a pedir que minimiza o custo total anual. Q = √(2·D·Cs/Ch).', en: 'Economic Order Quantity — fixed order amount minimizing total annual cost. Q = √(2·D·Cs/Ch).' } },
    { term: 'Holding cost (Ch)', definition: { pt: 'Custo de manter uma unidade em estoque por um ano (juro, espaço, segurança). Sobe com o tamanho do lote.', en: 'Cost to hold one unit in stock for a year (interest, space, security). Rises with batch size.' } },
    { term: 'Order/Set-up cost (Cs)', definition: { pt: 'Custo fixo de processar um pedido ou preparar uma máquina. Empurra para lotes grandes.', en: 'Fixed cost of processing an order or setting up a machine. Pushes toward large batches.' } },
    { term: 'Stock-out', definition: { pt: 'Ficar sem material. Custa caro: para a produção, perde venda/cliente. O safety stock protege contra isso.', en: 'Running out of material. Costly: halts production, loses sales/customers. Safety stock protects against it.' } },
    { term: 'Reorder Level (ROL/ROP)', definition: { pt: 'Nível de estoque que dispara um novo pedido no sistema Q. Também "reorder point".', en: 'Stock level that triggers a new order in the Q-system. Also "reorder point".' } },
    { term: 'Safety stock', definition: { pt: 'Estoque extra para cobrir variação de demanda e do lead time, evitando o stock-out.', en: 'Extra stock covering demand and lead-time variation, avoiding the stock-out.' } },
    { term: 'Lead time', definition: { pt: 'Tempo entre fazer o pedido e receber a entrega. Quanto maior, mais safety stock é preciso.', en: 'Time between placing an order and receiving delivery. The longer it is, the more safety stock is needed.' } },
    { term: 'Q-System (ROL)', definition: { pt: 'Quantidade fixa (EOQ), intervalos irregulares; dispara no ROL. Exige monitoramento contínuo. Ex: two-bin.', en: 'Fixed quantity (EOQ), irregular intervals; triggered at ROL. Needs continuous monitoring. E.g. two-bin.' } },
    { term: 'P-System (CR)', definition: { pt: 'Revisão em períodos fixos, quantidade variável para voltar ao nível-alvo. Sem monitoramento contínuo.', en: 'Review at fixed periods, variable quantity to return to a target level. No continuous monitoring.' } },
    { term: 'Two-bin system', definition: { pt: 'Implementação visual do sistema Q: pede-se quando a primeira caixa esvazia (atinge o ROL).', en: 'Visual implementation of the Q-system: order when the first bin empties (hits the ROL).' } },
    { term: 'ABC analysis', definition: { pt: 'Classifica itens por valor de uso anual: A (~10% itens, ~80% valor), B (~30%/~15%), C (~60%/~5%).', en: 'Classifies items by annual usage value: A (~10% items, ~80% value), B (~30%/~15%), C (~60%/~5%).' } },
    { term: 'Dependent demand', definition: { pt: 'Demanda de uma peça derivada de outra (100 tratores → 400 rodas). Calculável — base do MRP.', en: 'Demand for a part derived from another (100 tractors → 400 wheels). Calculable — the basis of MRP.' } },
    { term: 'MRP', definition: { pt: 'Material Requirements Planning — planeja materiais a partir de MPS + BOM + registros de estoque.', en: 'Material Requirements Planning — plans materials from MPS + BOM + inventory records.' } },
    { term: 'MPS', definition: { pt: 'Master Production Schedule — o plano do que produzir e quando; primeira entrada do MRP.', en: 'Master Production Schedule — the plan of what to make and when; MRP\'s first input.' } },
    { term: 'BOM', definition: { pt: 'Bill of Materials — a árvore/receita do produto: cada peça e submontagem com sua quantidade.', en: 'Bill of Materials — the product tree/recipe: each part and sub-assembly with its quantity.' } },
    { term: 'MRP II', definition: { pt: 'Manufacturing Resource Planning — MRP + planejamento de capacidade (closed-loop).', en: 'Manufacturing Resource Planning — MRP + capacity planning (closed-loop).' } },
    { term: 'ERP', definition: { pt: 'Enterprise Resource Planning — sistema corporativo com banco central integrando toda a empresa. Ex: SAP, Oracle.', en: 'Enterprise Resource Planning — corporate system with a central database integrating the whole firm. E.g. SAP, Oracle.' } },
    { term: 'Reverse logistics', definition: { pt: 'Fluxo inverso: retornar produtos para reciclagem/remanufatura. Ex: Nespresso, Kodak.', en: 'Reverse flow: returning products for recycling/remanufacturing. E.g. Nespresso, Kodak.' } }
  ],
  connections: [
    { week: 6, reason: { pt: 'O VMI e o efeito chicote da Semana 6 são sobre estoque; aqui aprofundamos como decidir quanto e quando pedir.', en: 'Week 6\'s VMI and bullwhip are about stock; here we go deeper into deciding how much and when to order.' } },
    { week: 8, reason: { pt: 'A Semana 8 (Lean/JIT da Toyota) é o caso extremo do controle de estoque: buscar estoque quase zero puxando pela demanda real.', en: 'Week 8 (Toyota Lean/JIT) is the extreme case of inventory control: aiming for near-zero stock by pulling from real demand.' } },
    { week: 5, reason: { pt: 'A demanda dependente e o MRP dependem da rede de fornecedores desenhada na Semana 5.', en: 'Dependent demand and MRP rely on the supplier network designed in Week 5.' } },
    { week: 4, reason: { pt: 'O ponto de desacoplamento e os tipos de pedido (make-to-stock/order) da Semana 4 definem quanto estoque manter.', en: 'The decoupling point and order types (make-to-stock/order) from Week 4 define how much stock to keep.' } }
  ],
  flashcards: [
    { q: { pt: 'Quais são as duas perguntas centrais da gestão de estoque?', en: 'What are the two central questions of inventory management?' }, a: { pt: 'QUANTO pedir (respondido pelo EOQ) e QUANDO pedir (respondido pelos sistemas Q e P).', en: 'HOW MUCH to order (answered by EOQ) and WHEN to order (answered by the Q and P systems).' } },
    { q: { pt: 'Qual a fórmula do EOQ e o que cada letra significa?', en: 'What is the EOQ formula and what does each letter mean?' }, a: { pt: 'Q = √(2·D·Cs / Ch). D = demanda anual, Cs = custo por pedido (set-up), Ch = custo de manter uma unidade por ano.', en: 'Q = √(2·D·Cs / Ch). D = annual demand, Cs = cost per order (set-up), Ch = cost to hold one unit per year.' } },
    { q: { pt: 'No ponto do EOQ, qual a relação entre custo de manutenção e custo de pedido?', en: 'At the EOQ point, what is the relationship between holding cost and ordering cost?' }, a: { pt: 'São IGUAIS. O custo total (soma dos dois) é mínimo exatamente onde o custo de manutenção anual = custo de pedido anual.', en: 'They are EQUAL. Total cost (their sum) is minimized exactly where annual holding cost = annual ordering cost.' } },
    { q: { pt: 'Por que o custo de manutenção puxa para lotes pequenos e o de pedido para lotes grandes?', en: 'Why does holding cost push toward small batches and ordering cost toward large ones?' }, a: { pt: 'Manutenção sobe com o lote (mais material parado custa juro/espaço). Pedido é fixo por pedido, então lotes grandes diluem esse custo por item.', en: 'Holding rises with batch size (more idle stock costs interest/space). Ordering is fixed per order, so large batches dilute that cost per item.' } },
    { q: { pt: 'Diferencie o sistema Q do sistema P.', en: 'Distinguish the Q-system from the P-system.' }, a: { pt: 'Q = quantidade FIXA (EOQ), intervalos irregulares, dispara no ROL, exige monitoramento contínuo. P = período FIXO, quantidade variável para voltar ao nível-alvo, sem monitoramento contínuo.', en: 'Q = FIXED quantity (EOQ), irregular intervals, triggered at ROL, needs continuous monitoring. P = FIXED period, variable quantity to return to a target level, no continuous monitoring.' } },
    { q: { pt: 'O que é estoque de segurança (safety stock) e o que aumenta a necessidade dele?', en: 'What is safety stock and what increases the need for it?' }, a: { pt: 'Estoque extra para cobrir incerteza da demanda e do lead time. Aumenta com lead times longos, demanda variável e alto custo de stock-out.', en: 'Extra stock covering demand and lead-time uncertainty. It increases with long lead times, variable demand and high stock-out cost.' } },
    { q: { pt: 'Na análise ABC, o que caracteriza os itens classe A e como controlá-los?', en: 'In ABC analysis, what characterizes class A items and how to control them?' }, a: { pt: 'Poucos itens (~10%) que valem ~80% do gasto anual. Controlar de perto, com sistema preciso (ROL em tempo real, código de barras).', en: 'Few items (~10%) worth ~80% of annual spend. Control closely, with a precise system (real-time ROL, barcodes).' } },
    { q: { pt: 'Diferencie demanda independente de dependente.', en: 'Distinguish independent from dependent demand.' }, a: { pt: 'Independente vem do mercado, é imprevisível (usa EOQ/ROL). Dependente deriva de outro item e é calculável (100 tratores = 400 rodas) — base do MRP.', en: 'Independent comes from the market, unpredictable (uses EOQ/ROL). Dependent derives from another item and is calculable (100 tractors = 400 wheels) — the basis of MRP.' } },
    { q: { pt: 'Quais são as 3 entradas do MRP?', en: 'What are the 3 inputs of MRP?' }, a: { pt: '(1) Plano Mestre de Produção (MPS) — o que/quando produzir; (2) Lista de Materiais (BOM) — a receita do produto; (3) registros de estoque — o que já temos.', en: '(1) Master Production Schedule (MPS) — what/when to make; (2) Bill of Materials (BOM) — the product recipe; (3) inventory records — what we already have.' } },
    { q: { pt: 'Qual a relação entre MRP, MRP II e ERP?', en: 'What is the relationship between MRP, MRP II and ERP?' }, a: { pt: 'MRP planeja materiais; MRP II acrescenta planejamento de capacidade (closed-loop); ERP integra a empresa toda (finanças, RH, vendas) num banco central. Ex: SAP, Oracle.', en: 'MRP plans materials; MRP II adds capacity planning (closed-loop); ERP integrates the whole firm (finance, HR, sales) in a central database. E.g. SAP, Oracle.' } },
    { q: { pt: 'Por que a logística reversa é mais difícil que a logística "para frente"?', en: 'Why is reverse logistics harder than "forward" logistics?' }, a: { pt: 'Porque as quantidades e as condições dos produtos que retornam são imprevisíveis, exigindo inspeção, triagem e recondicionamento. Ex: Nespresso, Kodak.', en: 'Because the quantities and conditions of returning products are unpredictable, requiring inspection, sorting and reconditioning. E.g. Nespresso, Kodak.' } }
  ],
  links: [
    { title: 'Inventory management (Prof. Netland, ETH Zurich)', url: 'https://www.youtube.com/results?search_query=netland+inventory+management', type: 'video', description: { pt: 'Vídeo definindo o que é estoque, seus tipos, onde o encontramos e por que importa.', en: 'Video defining what inventory is, its types, where we find it and why it matters.' } },
    { title: 'What is inventory? (Tanoy, Zoho)', url: 'https://www.zoho.com/inventory/guides/what-is-inventory.html', type: 'article', description: { pt: 'Definição de estoque e seus tipos, caso não consiga acessar o vídeo.', en: 'Definition of inventory and its types, if you can\'t access the video.' } },
    { title: 'Current blood stock levels (Scottish National Blood Transfusion Service)', url: 'https://www.scotblood.co.uk/', type: 'other', description: { pt: 'Níveis de estoque de sangue ao vivo na Escócia — exemplo de estoque crítico e perecível.', en: 'Live blood stock levels in Scotland — an example of critical, perishable inventory.' } },
    { title: 'What is MRP? (SAP Insights)', url: 'https://www.sap.com/products/scm/what-is-mrp.html', type: 'article', description: { pt: 'MRP explicado pela gigante de ERP SAP.', en: 'MRP explained by ERP giant SAP.' } },
    { title: 'Responsibility means recyclability (Nespresso)', url: 'https://www.nespresso.com/', type: 'video', description: { pt: 'O processo de reciclagem da Nespresso — exemplo de logística reversa.', en: 'Nespresso\'s recycling process — a reverse-logistics example.' } }
  ],
  notes: {
    pt: `═══ VISÃO GERAL ═══
Em manufatura, comprar material pode ser 70% das despesas. A regra: mínimo de estoque, sem faltar. Tudo se resume a QUANTO pedir e QUANDO pedir, pesando o custo de faltar contra o custo de ter demais.

═══ POR QUE (NÃO) TER ESTOQUE ═══
Ter estoque protege contra a variação e evita o stock-out (parar a produção, perder venda). MAS prende dinheiro, ocupa espaço, arrisca obsolescência. O bom gestor equilibra os dois riscos. Tipos de estoque: matéria-prima, WIP, produto acabado (+ de segurança, de ciclo, de antecipação, em trânsito).

═══ OS TRÊS CUSTOS ═══
• Manutenção (holding/Ch): luz, calor, segurança, espaço e JURO do capital. Sobe com o lote → empurra para pedir pouco.
• Pedido (ordering/set-up/Cs): fixo por pedido (processar, transportar, preparar máquina). → empurra para pedir muito.
• Stock-out: custo de faltar (produção parada, venda/cliente perdidos). O safety stock protege contra ele.

═══ EOQ — LOTE ECONÔMICO (Figura 9.2) ═══
O "quanto pedir" ótimo. Custo total = manutenção + pedido = curva em U; o fundo é o EOQ, onde manutenção anual = pedido anual.
Fórmula: Q = √(2·D·Cs / Ch)  [D = demanda anual, Cs = custo/pedido, Ch = custo de manter 1 unidade/ano].
Exemplo do livro (CCS): 860 latas/dia × 250 dias, Cs=$25, Ch=10% de $1,20/six-pack → EOQ = 3.864 caixas; ~9,3 pedidos/ano (a cada 39 dias); estoque médio Q/2 = 1.932 caixas; custo total do sistema = $463,68/ano.
Robustez: erro de 50% numa estimativa → EOQ erra só ~30%. (Analogia: quanto sacar no caixa eletrônico — frequência de idas vs. risco de andar com muito dinheiro.)

═══ QUANDO PEDIR: SISTEMA Q vs P ═══
• Sistema Q = ROL (reorder level): pede quantidade FIXA (o EOQ) quando o estoque cai ao ponto de ressuprimento. Intervalos irregulares. Precisa monitorar o estoque o tempo todo (código de barras, two-bin). Q = Quantidade fixa.
• Sistema P = revisão cíclica (CR): revisa em PERÍODOS fixos e pede o quanto falta para voltar ao nível-alvo. Quantidade variável. Não precisa de monitoramento contínuo. P = Período fixo.
Safety stock protege os dois contra atraso de entrega e variação da demanda. Two-bin = versão visual do Q (pede quando a 1ª caixa esvazia).

═══ ONDE FOCAR: ANÁLISE ABC (Figuras 9.4/9.5) ═══
Ordena itens por valor de uso anual (custo × quantidade). Classe A: ~10% dos itens = ~80% do gasto → controle rígido e preciso. Classe B: ~30% / ~15%. Classe C: ~60% dos itens = ~5% do gasto → controle superficial (parafusos, porcas). É o 80/20 no estoque.

═══ DEMANDA DEPENDENTE E MRP (Figuras 9.6–9.11) ═══
Demanda independente = do mercado, imprevisível (usa EOQ/ROL). Demanda dependente = derivada do produto final (100 tratores → 400 rodas): calculável.
MRP (Material Requirements Planning) usa 3 entradas: MPS (o que/quando produzir) + BOM (a árvore/receita do produto) + registros de estoque → gera o plano de pedidos (o que, quanto, quando). Explode o produto de trás para frente (backwards) e desconta o estoque atual. Quase sempre computadorizado.
Evolução: MRP → MRP II (inclui capacidade, closed-loop) → ERP (empresa toda, banco central; SAP, Oracle). Implementar ERP é caro e cheio de fracassos famosos.

═══ LOGÍSTICA REVERSA (pp.279-281) ═══
O fluxo inverso: trazer produtos de volta para inspeção, reciclagem, recondicionamento, remanufatura. Mais difícil que a logística "para frente" (quantidades e condições imprevisíveis). Movida por lei, ambiente ou custo. Ex: Nespresso (cápsulas de alumínio), Kodak (310M+ câmeras recicladas).

═══ RESUMO DA SEMANA ═══
Exploramos a natureza e a importância do bom controle de estoque: faltar material causa problemas, mas estoque demais é desperdício. Ferramentas para demanda imprevisível: Q- e P-systems (quantidade fixa ou período fixo). Abordagem mais fina para demanda previsível: MRP (planos a partir da demanda dependente). Na próxima semana, o caso extremo de controle eficiente criado pela Toyota: o just-in-time / produção enxuta (lean).

═══ FONTES ═══

📖 Ebook — EBOOK_ Operations Management 2_e.pdf (Paton, Clegg, Hsuan & Pilkington), Capítulo 9
   → pp. 289–301 (natureza do estoque; gráfico dente-de-serra Fig. 9.1; EOQ Fig. 9.2 + exemplo trabalhado CCS; ponto de ressuprimento Fig. 9.3; sistemas Q/ROL e P/revisão cíclica; safety stock, stock-out, two-bin; análise ABC Figs. 9.4/9.5)
   → pp. 301–311 (demanda independente vs dependente; MRP Figs. 9.6–9.11 — MPS, BOM, registros de estoque, explosão backwards, exemplo da chaleira; MRP II Fig. 9.12; closed-loop Fig. 9.13; ERP Figs. 9.14/9.15, SAP/Oracle)
   → pp. 279–281 (logística reversa: inspeção, recondicionamento, remanufatura; Kodak)

📊 Figura 9.2 (curva de custo do EOQ) — lida como imagem, base para a visualização "EOQ" (eoqModel — calculadora interativa)
📊 Figura 9.3 (reorder point) — base para a visualização "Sistema Q vs P" (qpSystems)
📊 Figuras 9.7–9.9 (MRP: 3 entradas + BOM) — base para a visualização "MRP" (mrpTree)
📊 Figuras 9.4/9.5 (ABC) — base para a visualização "Análise ABC" (abcAnalysis)

🎬 Materiais do curso (Coursera, Week 7): vídeo Netland (ETH Zurich) + Tanoy/Zoho (o que é estoque); Serviço de Sangue da Escócia + Cruz Vermelha (estoque crítico); atividade EOQ (McDonald's/Quora); Coles hardware/CashierLive (TI no estoque); SAP Insights (MRP) + ERP implementation lessons; Amazon (sazonalidade); Nespresso (logística reversa).

📝 Conteúdo estruturado a partir das telas do curso enviadas pelo usuário + leitura do ebook (Capítulo 9, pp. 279–311). Matemática do EOQ conferida contra o exemplo trabalhado do livro (CCS = 3.864 caixas).`,
    en: `═══ OVERVIEW ═══
In manufacturing, buying materials can be 70% of expenses. The rule: minimum stock, without running out. It all comes down to HOW MUCH to order and WHEN to order, weighing the cost of running out against the cost of holding too much.

═══ WHY (NOT) HOLD STOCK ═══
Holding stock protects against variation and avoids the stock-out (halted production, lost sales). BUT it ties up cash, takes space, risks obsolescence. The good manager balances both risks. Stock types: raw materials, WIP, finished goods (+ safety, cycle, anticipation, pipeline).

═══ THE THREE COSTS ═══
• Holding (Ch): light, heat, security, space and the INTEREST on capital. Rises with batch size → pushes toward ordering little.
• Ordering (set-up/Cs): fixed per order (processing, transport, machine set-up). → pushes toward ordering a lot.
• Stock-out: the cost of running out (halted production, lost sales/customers). Safety stock protects against it.

═══ EOQ — ECONOMIC ORDER QUANTITY (Figure 9.2) ═══
The optimal "how much to order". Total cost = holding + ordering = a U-shaped curve; its bottom is the EOQ, where annual holding = annual ordering.
Formula: Q = √(2·D·Cs / Ch)  [D = annual demand, Cs = cost/order, Ch = cost to hold 1 unit/year].
Textbook example (CCS): 860 cans/day × 250 days, Cs=$25, Ch=10% of $1.20/six-pack → EOQ = 3,864 cases; ~9.3 orders/year (every 39 days); average stock Q/2 = 1,932 cases; total system cost = $463.68/year.
Robustness: a 50% error in an estimate → EOQ off by only ~30%. (Analogy: how much to withdraw from an ATM — trip frequency vs. risk of carrying too much cash.)

═══ WHEN TO ORDER: Q-SYSTEM vs P-SYSTEM ═══
• Q-System = ROL (reorder level): order a FIXED quantity (the EOQ) when stock drops to the reorder point. Irregular intervals. Needs continuous stock monitoring (barcodes, two-bin). Q = fixed Quantity.
• P-System = cyclical review (CR): review at FIXED periods and order enough to return to a target level. Variable quantity. No continuous monitoring. P = fixed Period.
Safety stock protects both against delivery delay and demand variation. Two-bin = the visual version of Q (order when the 1st bin empties).

═══ WHERE TO FOCUS: ABC ANALYSIS (Figures 9.4/9.5) ═══
Ranks items by annual usage value (cost × quantity). Class A: ~10% of items = ~80% of spend → tight, precise control. Class B: ~30% / ~15%. Class C: ~60% of items = ~5% of spend → cursory control (bolts, nuts). It is the 80/20 on inventory.

═══ DEPENDENT DEMAND AND MRP (Figures 9.6–9.11) ═══
Independent demand = from the market, unpredictable (uses EOQ/ROL). Dependent demand = derived from the final product (100 tractors → 400 wheels): calculable.
MRP (Material Requirements Planning) uses 3 inputs: MPS (what/when to make) + BOM (the product tree/recipe) + inventory records → generates the ordering plan (what, how much, when). It explodes the product backwards and subtracts current stock. Almost always computerized.
Evolution: MRP → MRP II (adds capacity, closed-loop) → ERP (whole firm, central database; SAP, Oracle). Implementing ERP is costly and full of famous failures.

═══ REVERSE LOGISTICS (pp.279-281) ═══
The reverse flow: bringing products back for inspection, recycling, reconditioning, remanufacturing. Harder than "forward" logistics (unpredictable quantities and conditions). Driven by law, environment or cost. E.g. Nespresso (aluminium capsules), Kodak (310M+ cameras recycled).

═══ WEEK SUMMARY ═══
We explored the nature and importance of effective inventory control: running short causes problems, but too much stock is wasteful. Tools for unpredictable demand: Q- and P-systems (fixed quantity or fixed period). A subtler approach for predictable demand: MRP (plans from dependent demand). Next week, the extreme case of efficient control created by Toyota: just-in-time / lean production.

═══ SOURCES ═══

📖 Ebook — EBOOK_ Operations Management 2_e.pdf (Paton, Clegg, Hsuan & Pilkington), Chapter 9
   → pp. 289–301 (nature of inventory; saw-tooth chart Fig. 9.1; EOQ Fig. 9.2 + CCS worked example; reorder point Fig. 9.3; Q/ROL and P/cyclical-review systems; safety stock, stock-out, two-bin; ABC analysis Figs. 9.4/9.5)
   → pp. 301–311 (independent vs dependent demand; MRP Figs. 9.6–9.11 — MPS, BOM, inventory records, backwards explosion, kettle example; MRP II Fig. 9.12; closed-loop Fig. 9.13; ERP Figs. 9.14/9.15, SAP/Oracle)
   → pp. 279–281 (reverse logistics: inspection, reconditioning, remanufacturing; Kodak)

📊 Figure 9.2 (EOQ cost curve) — read as an image, basis for the "EOQ" visualization (eoqModel — interactive calculator)
📊 Figure 9.3 (reorder point) — basis for the "Q-System vs P-System" visualization (qpSystems)
📊 Figures 9.7–9.9 (MRP: 3 inputs + BOM) — basis for the "MRP" visualization (mrpTree)
📊 Figures 9.4/9.5 (ABC) — basis for the "ABC Analysis" visualization (abcAnalysis)

🎬 Course materials (Coursera, Week 7): Netland video (ETH Zurich) + Tanoy/Zoho (what is inventory); Scottish Blood Service + Red Cross (critical inventory); EOQ activity (McDonald's/Quora); Coles hardware/CashierLive (IT in inventory); SAP Insights (MRP) + ERP implementation lessons; Amazon (seasonality); Nespresso (reverse logistics).

📝 Content structured from the course screens sent by the user + ebook reading (Chapter 9, pp. 279–311). EOQ maths checked against the textbook worked example (CCS = 3,864 cases).`
  }
};
