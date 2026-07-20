window.WEEKS_DATA = window.WEEKS_DATA || {};
window.WEEKS_DATA['operations-management'] = window.WEEKS_DATA['operations-management'] || {};
window.WEEKS_DATA['operations-management'][6] = {
  week: 6,
  status: 'not-started',
  title: { pt: 'Gestão da Cadeia e Relacionamentos', en: 'Supply Chain & Relationship Management' },
  overview: {
    pt: 'Se a Semana 5 desenhou a rede de suprimentos, esta semana pergunta: como gerenciar esses elos? Duas ideias comandam. Primeiro, o RISCO na rede — faltas (undersupply), excessos (oversupply) e distorção de informação — e como o tipo de relação com cada fornecedor deve depender do risco e do impacto no lucro (a Matriz de Kraljic). Segundo, o Efeito Chicote (bullwhip effect): pequenas variações na demanda do cliente final viram oscilações gigantes lá no fornecedor, por falta de informação compartilhada. Fechamos com abordagens avançadas que empurram a responsabilidade para outras empresas — Estoque Gerido pelo Fornecedor (VMI), suprimento ágil (agile supply), ponto de desacoplamento (decoupling point) e logística terceirizada (3PL) — para melhorar a confiabilidade.',
    en: 'If Week 5 drew the supply network, this week asks: how do we manage those links? Two ideas dominate. First, RISK in the network — shortages (undersupply), oversupply, and information distortion — and how the type of relationship with each supplier should depend on risk and profit impact (Kraljic\'s Matrix). Second, the Bullwhip Effect: small changes in the final customer\'s demand become huge swings back at the supplier, because information is not shared. We close with advanced approaches that push responsibility onto other firms — Vendor-Managed Inventory (VMI), agile supply, the decoupling point, and third-party logistics (3PL) — to improve reliability.'
  },
  concepts: [
    {
      pt: 'Risco na Cadeia de Suprimentos',
      en: 'Supply Chain Risk',
      definition: {
        pt: 'A chance de a demanda e a oferta não se casarem. Vem de faltas (undersupply — ex: chips da Nissan), excessos (oversupply — ex: lojas superlotadas em 2022), atrasos e, sobretudo, falta de informação. Gerenciar risco = melhorar relações com fornecedores e compartilhar informação.',
        en: 'The chance that demand and supply fail to match. It comes from shortages (undersupply — e.g. Nissan\'s chips), oversupply (e.g. overstocked stores in 2022), delays, and above all a lack of information. Managing risk = improving supplier relationships and sharing information.'
      }
    },
    {
      pt: 'Matriz de Kraljic',
      en: "Kraljic's Matrix",
      definition: {
        pt: 'Ferramenta que classifica itens comprados em 4 quadrantes cruzando o impacto no lucro (eixo vertical, interno) com o risco de suprimento / complexidade do mercado (eixo horizontal, externo). Cada quadrante pede uma tática de compra diferente: rotina, gargalo, alavancagem e crítico.',
        en: 'A tool that classifies purchased items into 4 quadrants by crossing profit impact (vertical axis, internal) with supply risk / market complexity (horizontal axis, external). Each quadrant needs a different purchasing tactic: routine, bottleneck, leverage and critical.'
      }
    },
    {
      pt: 'Relação de Braço Estendido (Arm\'s Length)',
      en: "Arm's Length Relationship",
      definition: {
        pt: 'Relação distante e transacional, boa para itens padronizados de baixo valor (parafusos, porcas). Foco em preço, benchmarking de preço, interface funcional única, pouca coordenação. Não envolve a competência central da empresa compradora.',
        en: 'A distant, transactional relationship, good for low-value standardized items (bolts, nuts). Focus on price, price benchmarking, a single functional interface, little coordination. It does not involve the buyer\'s core competence.'
      }
    },
    {
      pt: 'Parceria Estratégica (Strategic Partnership)',
      en: 'Strategic Partnership',
      definition: {
        pt: 'Relação profunda e de longo prazo para itens customizados de alto valor, com forte interdependência. Envolve múltiplas interfaces funcionais, benchmarking de capacidades e investimento substancial em rotinas de troca de conhecimento entre as empresas.',
        en: 'A deep, long-term relationship for high-value customized items, with strong interdependence. It involves multiple functional interfaces, capability benchmarking, and substantial investment in inter-firm knowledge-sharing routines.'
      }
    },
    {
      pt: 'Efeito Chicote (Bullwhip / Forrester Effect)',
      en: 'Bullwhip Effect (Forrester Effect)',
      definition: {
        pt: 'A informação sobre a demanda real do cliente final se distorce e AMPLIFICA à medida que sobe (upstream) na cadeia. Cada elo pede com base no pedido do elo seguinte, não no consumo real — como um "telefone sem fio". Resultado: estoque excessivo, rupturas e produção ineficiente.',
        en: 'Information about the final customer\'s real demand distorts and AMPLIFIES as it moves upstream. Each link orders based on the next link\'s order, not on real consumption — like "Chinese whispers". Result: excess inventory, stock-outs and inefficient production.'
      }
    },
    {
      pt: 'Estoque Gerido pelo Fornecedor (VMI)',
      en: 'Vendor-Managed Inventory (VMI)',
      definition: {
        pt: 'O fornecedor gerencia o estoque em nome do comprador. O comprador compartilha dados de estoque; o fornecedor decide reposição, quantidades e timing. O pedido ainda parte do comprador, mas o custo de transação passa para o fornecedor. Usado por Tesco e supermercados.',
        en: 'The supplier manages inventory on the buyer\'s behalf. The buyer shares inventory data; the supplier decides replenishment, quantities and timing. The purchase order still comes from the buyer, but the transaction cost shifts to the supplier. Used by Tesco and grocery stores.'
      }
    },
    {
      pt: 'Suprimento Ágil (Agile Supply)',
      en: 'Agile Supply',
      definition: {
        pt: 'Cadeia responsiva, feita para demanda imprevisível e volátil (moda, tecnologia). Usa conhecimento de mercado e cooperação para explorar oportunidades rápidas. O motor é a disponibilidade, não o preço. Contrasta com o suprimento enxuto (lean supply), feito para demanda estável e previsível.',
        en: 'A responsive chain, built for unpredictable, volatile demand (fashion, technology). It uses market knowledge and cooperation to exploit fast opportunities. The driver is availability, not price. It contrasts with lean supply, built for stable, predictable demand.'
      }
    },
    {
      pt: 'Ponto de Desacoplamento (Decoupling Point)',
      en: 'Decoupling Point',
      definition: {
        pt: 'O ponto na cadeia que separa o que é feito por PREVISÃO (empurrar / push, a montante) do que é feito por PEDIDO real do cliente (puxar / pull, a jusante). É onde fica o estoque de segurança (buffer) e onde ocorre a diferenciação/customização do produto (postponement).',
        en: 'The point in the chain separating what is made to FORECAST (push, upstream) from what is made to a real customer ORDER (pull, downstream). It is where the buffer stock sits and where product differentiation/customization takes place (postponement).'
      }
    },
    {
      pt: 'Leagile (Lean + Agile)',
      en: 'Leagile (Lean + Agile)',
      definition: {
        pt: 'Combinação do melhor dos dois mundos: eficiência enxuta (lean) na parte inicial da cadeia (a montante do ponto de desacoplamento) e flexibilidade ágil (agile) na parte final (a jusante). O ponto de desacoplamento é a costura que liga os dois.',
        en: 'A combination of the best of both worlds: lean efficiency in the early chain (upstream of the decoupling point) and agile flexibility in the later chain (downstream). The decoupling point is the seam that joins the two.'
      }
    },
    {
      pt: 'Logística Terceirizada (3PL / TPL)',
      en: 'Third-Party Logistics (3PL / TPL)',
      definition: {
        pt: 'Terceirizar toda ou parte da operação logística (transporte, armazenagem) para um fornecedor externo especializado, com mais recursos e expertise do que a empresa teria sozinha. Ex: DHL, Maersk. É como o VMI, mas passa a operação logística inteira adiante.',
        en: 'Outsourcing all or part of the logistics operation (transport, warehousing) to a specialized external provider with more resources and expertise than the firm could muster alone. E.g. DHL, Maersk. It is like VMI, but hands over the entire logistics operation.'
      }
    },
    {
      pt: 'Postponement (Adiamento)',
      en: 'Postponement',
      definition: {
        pt: 'Estratégia de adiar a diferenciação do produto (o momento em que ele vira uma variante específica) o máximo possível na cadeia, mantendo-o genérico até saber o pedido real. Reduz o risco de fazer a variante errada. Ocorre no ponto de desacoplamento.',
        en: 'A strategy of delaying product differentiation (the moment it becomes a specific variant) as late as possible in the chain, keeping it generic until the real order is known. It reduces the risk of making the wrong variant. It happens at the decoupling point.'
      }
    }
  ],
  theories: [
    {
      name: { pt: 'Matriz de Compras de Kraljic', en: "Kraljic's Tactical Procurement Matrix" },
      authors: ['Kraljic'],
      year: '1983',
      renderer: 'kraljicMatrix',
      description: {
        pt: 'A força da matriz está na simplicidade: mostra 4 táticas de compra que dependem da complexidade, do risco e do impacto do item se ele falhar em ser entregue. O eixo vertical é o impacto no lucro (fatores internos); o horizontal é o risco de mercado e suprimento (fatores externos). A regra de ouro: contextos de compra diferentes pedem táticas diferentes — seria ineficiente compartilhar informação estratégica com um fornecedor de parafusos, e perigoso tratar um fornecedor crítico sem pensar na parceria de longo prazo. Clique em cada quadrante para ver a tática e exemplos.',
        en: 'The strength of the matrix is its simplicity: it shows 4 purchasing tactics that depend on an item\'s complexity, risk and impact if it fails to be delivered. The vertical axis is profit impact (internal factors); the horizontal is market and supply risk (external factors). The golden rule: different procurement contexts need different tactics — it would be inefficient to share strategic information with a bolt supplier, and dangerous to treat a critical supplier without considering the long-term partnership. Click each quadrant to see its tactic and examples.'
      }
    },
    {
      name: { pt: 'Efeito Chicote', en: 'The Bullwhip Effect' },
      authors: ['Forrester', 'Lee et al.'],
      year: '1997',
      renderer: 'wave',
      description: {
        pt: 'Também chamado de Efeito Forrester. A distorção acontece porque cada membro da cadeia decide seus pedidos com base no pedido que recebe do membro seguinte (a jusante), não na demanda real do consumidor. Pequenas flutuações se amplificam a cada elo: o pedido do varejista ao distribuidor já varia mais que as vendas ao consumidor; o do distribuidor ao fabricante varia ainda mais; e o do fabricante ao fornecedor tem as maiores oscilações. QUATRO causas amplificam: (1) atualização imprecisa da previsão de demanda, (2) pedidos em lote (order batching), (3) flutuação de preços (promoções), (4) jogo de racionamento e escassez (comprar demais na iminência de falta). Controla-se com 3 alavancas: compartilhar informação, alinhar o canal e ganhar eficiência operacional. A animação mostra a amplificação do consumidor ao fabricante.',
        en: 'Also called the Forrester Effect. Distortion happens because each chain member decides its orders based on the order it receives from the next member (downstream), not on the real consumer demand. Small fluctuations amplify at each link: the retailer\'s order to the distributor already varies more than consumer sales; the distributor\'s to the manufacturer varies even more; and the manufacturer\'s to the supplier has the largest swings. FOUR causes amplify it: (1) inaccurate demand forecast updating, (2) order batching, (3) price fluctuation (promotions), (4) rationing and shortage gaming (over-ordering when a shortage looms). It is controlled with 3 levers: information sharing, channel alignment and operational efficiency. The animation shows the amplification from consumer to manufacturer.'
      }
    },
    {
      name: { pt: 'Braço Estendido vs Parceria Estratégica', en: "Arm's Length vs Strategic Partnership" },
      authors: [],
      year: '',
      renderer: 'armsVsPartnership',
      description: {
        pt: 'A relação entre comprador e fornecedor varia num espectro, de distante (arm\'s length) a profunda (parceria estratégica). A escolha deve casar com a característica do item (Tabela 8.1). Itens padronizados de baixo valor (commodities), que não tocam a competência central, pedem relações de braço estendido com foco em preço. Itens customizados de alto valor, com muitas interações, pedem parcerias com troca de conhecimento. O caso Walmart mostra a tensão: ele exige cortes de preço ano após ano (lado adversarial), mas também ajuda o fornecedor a ganhar eficiência (lado cooperativo).',
        en: 'The buyer-supplier relationship varies on a spectrum, from distant (arm\'s length) to deep (strategic partnership). The choice should match the item\'s characteristics (Table 8.1). Low-value standardized items (commodities), which do not touch core competence, call for arm\'s length relationships focused on price. High-value customized items, with many interactions, call for partnerships with knowledge-sharing. The Walmart case shows the tension: it demands year-on-year price cuts (adversarial side), yet also helps suppliers gain efficiency (cooperative side).'
      }
    },
    {
      name: { pt: 'Ponto de Desacoplamento: Empurrar vs Puxar', en: 'Decoupling Point: Push vs Pull' },
      authors: ['Mason-Jones et al.', 'Christopher'],
      year: '2000',
      renderer: 'decouplingPoint',
      description: {
        pt: 'Para uma gestão ótima do fornecimento, o ponto de desacoplamento separa as atividades feitas para atender pedidos reais do cliente (estratégia de puxar / pull) das feitas por previsão de demanda (estratégia de empurrar / push). No push, os bens são produzidos primeiro e depois vendidos — exige muito estoque pronto. No pull, a informação do pedido chega antes de a produção começar. É nesse ponto que fica o estoque de segurança (buffer) e onde acontece a diferenciação do produto por adiamento (postponement). Quanto mais tarde o ponto (mais perto do cliente), mais "make-to-stock"; quanto mais cedo (mais perto da matéria-prima), mais "make-to-order" / "buy-to-order" — como a Dell faz com computadores sob encomenda.',
        en: 'For optimal supply management, the decoupling point separates activities done to meet real customer orders (pull strategy) from those done to demand forecast (push strategy). In push, goods are produced first and then sold — it needs plenty of ready stock. In pull, order information arrives before production starts. This is where the buffer stock sits and where product differentiation via postponement happens. The later the point (closer to the customer), the more "make-to-stock"; the earlier (closer to raw material), the more "make-to-order" / "buy-to-order" — as Dell does with built-to-order computers.'
      }
    }
  ],
  authors: [
    {
      name: 'Peter Kraljic',
      role: { pt: 'Consultor (McKinsey), autor do artigo seminal na Harvard Business Review (1983)', en: 'Consultant (McKinsey), author of the seminal Harvard Business Review article (1983)' },
      contribution: { pt: 'Criou a matriz de compras que leva seu nome em "Purchasing must become supply management" (1983). Transformou compras de uma função tática de custo em uma função estratégica de gestão de risco de suprimento.', en: 'Created the purchasing matrix that bears his name in "Purchasing must become supply management" (1983). He turned purchasing from a tactical cost function into a strategic supply-risk management function.' }
    },
    {
      name: 'Jay Forrester',
      role: { pt: 'Engenheiro do MIT, pai da Dinâmica de Sistemas (System Dynamics)', en: 'MIT engineer, father of System Dynamics' },
      contribution: { pt: 'Identificou a amplificação da variabilidade da demanda ao longo da cadeia — por isso o efeito chicote também é chamado de "Efeito Forrester".', en: 'Identified the amplification of demand variability along the chain — which is why the bullwhip effect is also called the "Forrester Effect".' }
    },
    {
      name: 'Hau Lee et al.',
      role: { pt: 'Pesquisadores de supply chain (Stanford), artigo de 1997', en: 'Supply chain researchers (Stanford), 1997 paper' },
      contribution: { pt: 'Sistematizaram as quatro causas do efeito chicote e o framework de coordenação (compartilhar informação, alinhar canal, eficiência operacional). Analisaram o caso das fraldas Pampers da P&G.', en: 'Systematized the four causes of the bullwhip effect and the coordination framework (information sharing, channel alignment, operational efficiency). They analyzed P&G\'s Pampers case.' }
    },
    {
      name: 'Martin Christopher',
      role: { pt: 'Professor de Logística (Cranfield), teórico do suprimento ágil', en: 'Professor of Logistics (Cranfield), agile supply theorist' },
      contribution: { pt: 'Popularizou os conceitos de cadeia ágil (agile supply chain) e leagile (lean + agile combinados via ponto de desacoplamento).', en: 'Popularized the concepts of the agile supply chain and leagile (lean + agile combined via the decoupling point).' }
    }
  ],
  caseStudies: [
    {
      company: 'Nissan',
      sector: { pt: 'Automotivo — falta de suprimento (item gargalo)', en: 'Automotive — supply shortage (bottleneck item)' },
      lesson: { pt: 'Em 2021, a Nissan produziu meio milhão de carros a menos por falta de chips (processadores). Chips são um item de GARGALO clássico na matriz de Kraljic: baixo impacto no valor unitário, mas altíssimo risco de suprimento — sem eles, para tudo. Lição: para gargalos, garantir disponibilidade com contratos de longo prazo e fornecedores confiáveis vale mais que espremer preço.', en: 'In 2021, Nissan made half a million fewer cars due to a chip (processor) shortage. Chips are a classic BOTTLENECK item in Kraljic\'s matrix: low unit-value impact, but very high supply risk — without them, everything stops. Lesson: for bottlenecks, securing availability with long-term contracts and reliable suppliers beats squeezing on price.' }
    },
    {
      company: 'Walmart',
      sector: { pt: 'Varejo — gestão de fornecedores (adversarial + cooperativa)', en: 'Retail — supplier management (adversarial + cooperative)' },
      lesson: { pt: 'O Walmart exige de seus fornecedores cortes de preço implacáveis ano após ano, MAS também trabalha para ajudá-los a desenvolver eficiência própria. Mostra que "adversarial" e "cooperativo" não são opostos absolutos: uma relação pode ser dura no preço e colaborativa na capacitação ao mesmo tempo.', en: 'Walmart demands ruthless year-on-year price cuts from suppliers, BUT also works to help them develop their own efficiency. It shows "adversarial" and "cooperative" are not absolute opposites: a relationship can be tough on price and collaborative on capability-building at the same time.' }
    },
    {
      company: 'Tesco',
      sector: { pt: 'Varejo de alimentos — VMI', en: 'Grocery retail — VMI' },
      lesson: { pt: 'Grandes supermercados como a Tesco usam VMI (estoque gerido pelo fornecedor): o fornecedor vê os dados de estoque e ponto de venda (POS) e repõe sozinho. Reduz rupturas, melhora o giro e transfere o custo de transação do pedido para o fornecedor.', en: 'Large supermarkets like Tesco use VMI (vendor-managed inventory): the supplier sees inventory and point-of-sale (POS) data and replenishes on its own. It reduces stock-outs, improves turns, and shifts the ordering transaction cost to the supplier.' }
    },
    {
      company: 'Procter & Gamble',
      sector: { pt: 'Bens de consumo — efeito chicote (fraldas Pampers)', en: 'Consumer goods — bullwhip effect (Pampers)' },
      lesson: { pt: 'A P&G notou que as vendas de fraldas Pampers ao consumidor eram estáveis, mas os pedidos dos varejistas e distribuidores oscilavam muito — o efeito chicote clássico. A causa era a distorção de informação subindo a cadeia, resolvida com mais compartilhamento de dados.', en: 'P&G noticed that consumer Pampers sales were steady, but retailer and distributor orders swung wildly — the classic bullwhip effect. The cause was information distortion moving up the chain, solved with more data sharing.' }
    },
    {
      company: 'Retail dos EUA (2022)',
      sector: { pt: 'Varejo — excesso de suprimento (oversupply)', en: 'Retail — oversupply' },
      lesson: { pt: '"Um Armagedom do varejo": após os gargalos de 2021, os produtos chegaram todos de uma vez e as lojas ficaram superlotadas em 2022, forçando grandes descontos. Mostra o OUTRO lado do desalinhamento demanda-oferta: não só a falta, mas o excesso também custa caro (capital preso, remarcações).', en: 'A "retail Armageddon": after the 2021 bottlenecks, products arrived all at once and stores were overstocked in 2022, forcing big discounts. It shows the OTHER side of demand-supply mismatch: not only shortage, but oversupply is costly too (tied-up capital, markdowns).' }
    },
    {
      company: 'Dell',
      sector: { pt: 'Computadores — make-to-order / ponto de desacoplamento tardio', en: 'Computers — make-to-order / early decoupling point' },
      lesson: { pt: 'A Dell monta o computador só depois do pedido do cliente (build-to-order), enquanto a maioria da indústria trabalha por estoque (make-to-stock). É o ponto de desacoplamento posicionado bem cedo na cadeia: puxa (pull) a partir do pedido, minimizando estoque de produto acabado e maximizando a customização.', en: 'Dell assembles the computer only after the customer\'s order (build-to-order), while most of the industry works to stock (make-to-stock). It is the decoupling point positioned very early in the chain: it pulls from the order, minimizing finished-goods stock and maximizing customization.' }
    }
  ],
  glossary: [
    { term: 'Kraljic Matrix', definition: { pt: 'Matriz 2×2 que classifica compras por impacto no lucro × risco de suprimento em 4 táticas: rotina, gargalo, alavancagem, crítico.', en: '2×2 matrix classifying purchases by profit impact × supply risk into 4 tactics: routine, bottleneck, leverage, critical.' } },
    { term: 'Leverage (Alavancagem)', definition: { pt: 'Quadrante Kraljic: alto impacto no lucro, baixo risco. Tática: usar o poder de compra e a concorrência entre vários fornecedores capazes para o melhor negócio.', en: 'Kraljic quadrant: high profit impact, low risk. Tactic: use buyer power and competition among several capable suppliers for the best deal.' } },
    { term: 'Bottleneck (Gargalo)', definition: { pt: 'Quadrante Kraljic: baixo impacto no lucro, alto risco. Tática: garantir a continuidade do suprimento com contrato de longo prazo e fornecedor confiável (ex: chips, combustível).', en: 'Kraljic quadrant: low profit impact, high risk. Tactic: secure supply continuity with a long-term contract and a reliable supplier (e.g. chips, fuel).' } },
    { term: 'Routine (Rotina)', definition: { pt: 'Quadrante Kraljic: baixo impacto, baixo risco. Tática: eficiência — competição entre muitos fornecedores para reduzir custos de transação (ex: parafusos, papelaria).', en: 'Kraljic quadrant: low impact, low risk. Tactic: efficiency — competition among many suppliers to cut transaction costs (e.g. bolts, stationery).' } },
    { term: 'Critical (Crítico)', definition: { pt: 'Quadrante Kraljic: alto impacto, alto risco. Tática: cooperação — parceria de longo prazo, fonte única, dependência mútua (ex: motores de avião, TI de bancos).', en: 'Kraljic quadrant: high impact, high risk. Tactic: cooperation — long-term partnership, single-sourcing, mutual dependence (e.g. aircraft engines, bank IT).' } },
    { term: 'Bullwhip Effect', definition: { pt: 'Amplificação da variabilidade da demanda ao subir a cadeia, por distorção de informação. Também "Efeito Forrester".', en: 'Amplification of demand variability moving up the chain, due to information distortion. Also the "Forrester Effect".' } },
    { term: 'Order Batching', definition: { pt: 'Uma das 4 causas do chicote: pedir em lotes (diário, semanal, mensal) em vez de continuamente, criando picos artificiais.', en: 'One of the 4 bullwhip causes: ordering in batches (daily, weekly, monthly) rather than continuously, creating artificial spikes.' } },
    { term: 'Shortage Gaming', definition: { pt: 'Causa do chicote: comprar mais do que precisa quando se prevê falta; depois a demanda estabiliza e os cancelamentos chegam, dando ao fornecedor uma leitura falsa.', en: 'Bullwhip cause: over-ordering when a shortage is expected; then demand stabilizes and cancellations arrive, giving the supplier a false read.' } },
    { term: 'VMI', definition: { pt: 'Vendor-Managed Inventory — o fornecedor gere o estoque do comprador com base em dados compartilhados. Também "co-managed inventory".', en: 'Vendor-Managed Inventory — the supplier manages the buyer\'s stock from shared data. Also "co-managed inventory".' } },
    { term: 'EDI', definition: { pt: 'Electronic Data Interchange — troca eletrônica de dados entre empresas, usada para reduzir lead time e o efeito chicote.', en: 'Electronic Data Interchange — electronic data exchange between firms, used to cut lead time and the bullwhip effect.' } },
    { term: 'POS', definition: { pt: 'Point-of-Sale — dados do ponto de venda (o que o consumidor realmente comprou), compartilhados a montante para combater o chicote.', en: 'Point-of-Sale data (what the consumer actually bought), shared upstream to fight the bullwhip.' } },
    { term: 'Agile Supply', definition: { pt: 'Cadeia responsiva para demanda volátil (moda, tech); o motor é a disponibilidade. Oposto do lean supply (estável, foco em preço).', en: 'Responsive chain for volatile demand (fashion, tech); the driver is availability. Opposite of lean supply (stable, price-focused).' } },
    { term: 'Decoupling Point', definition: { pt: 'Ponto que separa o push (previsão) do pull (pedido real); onde ficam o buffer e a diferenciação por postponement.', en: 'Point separating push (forecast) from pull (real order); where the buffer and postponement differentiation sit.' } },
    { term: 'Leagile', definition: { pt: 'Enxuto a montante do ponto de desacoplamento + ágil a jusante.', en: 'Lean upstream of the decoupling point + agile downstream.' } },
    { term: 'Postponement', definition: { pt: 'Adiar a diferenciação do produto até saber o pedido real, mantendo-o genérico o máximo possível.', en: 'Delaying product differentiation until the real order is known, keeping it generic as long as possible.' } },
    { term: '3PL / TPL', definition: { pt: 'Third-Party Logistics — terceirizar a operação logística (transporte, armazenagem) a um especialista externo (ex: DHL, Maersk).', en: 'Third-Party Logistics — outsourcing the logistics operation (transport, warehousing) to an external specialist (e.g. DHL, Maersk).' } },
    { term: 'Push vs Pull', definition: { pt: 'Push = produzir por previsão e depois vender (exige estoque). Pull = produzir só após o pedido real do cliente.', en: 'Push = produce to forecast then sell (needs stock). Pull = produce only after the real customer order.' } }
  ],
  connections: [
    { week: 5, reason: { pt: 'A Semana 5 desenhou a rede de suprimentos (chain → network → enterprise) e o sourcing; esta semana gerencia o risco e as relações dentro dela.', en: 'Week 5 drew the supply network (chain → network → enterprise) and sourcing; this week manages the risk and relationships within it.' } },
    { week: 7, reason: { pt: 'O VMI e o efeito chicote levam direto à Gestão de Estoque (Semana 7), onde se estudam as estratégias de quanto e quando pedir.', en: 'VMI and the bullwhip effect lead straight into Inventory Management (Week 7), covering how much and when to order.' } },
    { week: 4, reason: { pt: 'O ponto de desacoplamento usa os tipos de pedido (make-to-stock, make-to-order, buy-to-order) vistos no Design de Processos (Semana 4).', en: 'The decoupling point uses the order types (make-to-stock, make-to-order, buy-to-order) seen in Process Design (Week 4).' } },
    { week: 8, reason: { pt: 'Lean supply vs agile supply conecta com Operações Enxutas (Semana 8): o "lean" do leagile é a eliminação de desperdício.', en: 'Lean supply vs agile supply connects to Lean Operations (Week 8): the "lean" in leagile is waste elimination.' } }
  ],
  flashcards: [
    { q: { pt: 'Quais são os dois eixos da Matriz de Kraljic?', en: 'What are the two axes of Kraljic\'s Matrix?' }, a: { pt: 'Vertical = impacto no lucro (fatores internos); Horizontal = risco de suprimento / complexidade do mercado (fatores externos).', en: 'Vertical = profit impact (internal factors); Horizontal = supply risk / market complexity (external factors).' } },
    { q: { pt: 'Em que quadrante de Kraljic estão os chips que faltaram à Nissan, e qual a tática?', en: 'Which Kraljic quadrant are the chips Nissan lacked, and what is the tactic?' }, a: { pt: 'Gargalo (bottleneck): baixo impacto no lucro, alto risco de suprimento. Tática: garantir continuidade com contrato de longo prazo e fornecedor confiável.', en: 'Bottleneck: low profit impact, high supply risk. Tactic: secure continuity with a long-term contract and a reliable supplier.' } },
    { q: { pt: 'O que é o efeito chicote (bullwhip) e por que acontece?', en: 'What is the bullwhip effect and why does it happen?' }, a: { pt: 'A variabilidade da demanda amplifica ao subir a cadeia porque cada elo pede com base no pedido do elo seguinte, não no consumo real do cliente final (distorção de informação).', en: 'Demand variability amplifies up the chain because each link orders based on the next link\'s order, not on the final customer\'s real consumption (information distortion).' } },
    { q: { pt: 'Cite as 4 causas do efeito chicote.', en: 'Name the 4 causes of the bullwhip effect.' }, a: { pt: '(1) Previsão de demanda imprecisa; (2) pedidos em lote (order batching); (3) flutuação de preços/promoções; (4) jogo de racionamento e escassez (shortage gaming).', en: '(1) Inaccurate demand forecasting; (2) order batching; (3) price fluctuation/promotions; (4) rationing and shortage gaming.' } },
    { q: { pt: 'Como se controla o efeito chicote?', en: 'How is the bullwhip effect controlled?' }, a: { pt: 'Três alavancas: compartilhar informação (ex: dados POS), alinhar o canal (coordenar preço, transporte, estoque) e ganhar eficiência operacional.', en: 'Three levers: information sharing (e.g. POS data), channel alignment (coordinate price, transport, inventory) and operational efficiency.' } },
    { q: { pt: 'Diferencie relação de braço estendido (arm\'s length) de parceria estratégica.', en: 'Distinguish arm\'s length from strategic partnership.' }, a: { pt: 'Braço estendido: itens padronizados de baixo valor, foco em preço, pouca coordenação. Parceria: itens customizados de alto valor, interdependência forte, troca de conhecimento.', en: 'Arm\'s length: low-value standardized items, price focus, little coordination. Partnership: high-value customized items, strong interdependence, knowledge-sharing.' } },
    { q: { pt: 'O que é VMI e quem paga o custo de transação do pedido?', en: 'What is VMI and who bears the ordering transaction cost?' }, a: { pt: 'Vendor-Managed Inventory: o fornecedor gere o estoque do comprador a partir de dados compartilhados. O custo de transação passa para o fornecedor (o pedido ainda parte do comprador).', en: 'Vendor-Managed Inventory: the supplier manages the buyer\'s stock from shared data. The transaction cost shifts to the supplier (the order still comes from the buyer).' } },
    { q: { pt: 'O que separa o ponto de desacoplamento (decoupling point)?', en: 'What does the decoupling point separate?' }, a: { pt: 'Separa o que é feito por previsão (empurrar/push, a montante) do que é feito por pedido real (puxar/pull, a jusante). É onde fica o buffer e ocorre o postponement.', en: 'It separates what is made to forecast (push, upstream) from what is made to real order (pull, downstream). It is where the buffer sits and postponement happens.' } },
    { q: { pt: 'Quando usar suprimento ágil (agile) em vez de enxuto (lean)?', en: 'When to use agile supply instead of lean?' }, a: { pt: 'Ágil para demanda volátil e imprevisível, produtos de moda/tecnologia, ciclos curtos, alta variedade (motor = disponibilidade). Enxuto para demanda estável e previsível (motor = preço/custo).', en: 'Agile for volatile, unpredictable demand, fashion/tech goods, short cycles, high variety (driver = availability). Lean for stable, predictable demand (driver = price/cost).' } },
    { q: { pt: 'O que é 3PL e como se relaciona com o VMI?', en: 'What is 3PL and how does it relate to VMI?' }, a: { pt: '3PL (Third-Party Logistics) é terceirizar toda a operação logística a um especialista externo (ex: DHL). É como o VMI, mas passa a operação logística inteira adiante, não só a gestão de estoque.', en: '3PL (Third-Party Logistics) is outsourcing the whole logistics operation to an external specialist (e.g. DHL). It is like VMI, but hands over the entire logistics operation, not just inventory management.' } },
    { q: { pt: 'Por que o excesso de suprimento (oversupply) também é um risco, e não só a falta?', en: 'Why is oversupply also a risk, not just shortage?' }, a: { pt: 'Excesso prende capital em estoque parado e força remarcações/descontos (ex: lojas superlotadas dos EUA em 2022). Casar demanda e oferta é o objetivo — errar para qualquer lado custa caro.', en: 'Oversupply ties up capital in idle stock and forces markdowns/discounts (e.g. overstocked US stores in 2022). Matching demand and supply is the goal — erring either way is costly.' } }
  ],
  links: [
    { title: 'Nissan to make half a million fewer cars in 2021 due to chip shortage', url: 'https://www.cnbc.com/2021/01/14/nissan-to-make-half-a-million-fewer-cars-in-2021-due-to-chip-shortage.html', type: 'news', description: { pt: 'Shead, S. — CNBC (2021). Caso da falta de chips (item gargalo na matriz de Kraljic).', en: 'Shead, S. — CNBC (2021). The chip shortage case (a bottleneck item in Kraljic\'s matrix).' } },
    { title: '"It\'s a retail Armageddon": overstocked stores give big discounts', url: 'https://www.cbsnews.com/news/retail-overstock-supply-chain-discounts/', type: 'news', description: { pt: 'Evans, C. — CBS News (2022). O outro lado do risco: excesso de suprimento após os gargalos.', en: 'Evans, C. — CBS News (2022). The other side of risk: oversupply after the bottlenecks.' } },
    { title: 'Walmart increases pressure for its suppliers to cut prices', url: 'https://www.delimarketnews.com/', type: 'article', description: { pt: 'De Leon Chavez, M. — Deli Market News. Gestão de fornecedores: adversarial no preço, cooperativa na eficiência.', en: 'De Leon Chavez, M. — Deli Market News. Supplier management: adversarial on price, cooperative on efficiency.' } },
    { title: 'Vendor Managed Inventory (Source Atlantic)', url: 'https://www.sourceatlantic.ca/', type: 'video', description: { pt: 'Exemplo de VMI: o fornecedor assume a responsabilidade pelos produtos dentro da cadeia do comprador.', en: 'A VMI example: the supplier takes responsibility for its products within the buyer\'s chain.' } }
  ],
  notes: {
    pt: `═══ VISÃO GERAL ═══
A Semana 5 desenhou a rede. Agora gerenciamos os elos dela, com foco em RISCO e RELAÇÕES. Dois grandes temas: (1) casar o tipo de relação com fornecedor ao risco do item (Kraljic) e (2) domar a distorção de informação que gera o efeito chicote. Fechamos com abordagens que empurram responsabilidade adiante (VMI, ágil, desacoplamento, 3PL).

═══ RISCO NA CADEIA ═══
• Falta (undersupply) — ex: chips da Nissan (2021), meio milhão de carros a menos.
• Excesso (oversupply) — ex: lojas dos EUA superlotadas em 2022, forçando descontos.
• Atrasos e falta de informação — a raiz de quase todo desalinhamento.
→ A defesa é sempre a mesma: melhores relações + mais compartilhamento de informação.

═══ MATRIZ DE KRALJIC (Figura 8.1) ═══
Classifica itens comprados cruzando 2 eixos:
• Vertical = impacto no lucro/negócio (fatores INTERNOS).
• Horizontal = risco de suprimento / complexidade do mercado (fatores EXTERNOS).
Os 4 quadrantes e suas táticas:
• ROTINA (baixo impacto, baixo risco): eficiência — muitos fornecedores competindo em custo. Ex: parafusos, papelaria.
• GARGALO (baixo impacto, ALTO risco): continuidade — contrato de longo prazo, fornecedor único e confiável. Ex: chips, combustível. (← caso Nissan)
• ALAVANCAGEM (ALTO impacto, baixo risco): melhor negócio — usar poder de compra e concorrência entre vários capazes. Ex: bancos de carro, logística de e-commerce.
• CRÍTICO (ALTO impacto, ALTO risco): cooperação — parceria de longo prazo, fonte única, dependência mútua. Ex: motores de avião, TI de bancos.
Regra de ouro: contextos diferentes pedem táticas diferentes. Limite: a matriz é tática e otimiza UMA relação por vez — pode sub-otimizar a rede inteira.

═══ RELAÇÕES: BRAÇO ESTENDIDO vs PARCERIA (Tabela 8.1) ═══
Espectro do distante ao profundo:
• Braço estendido (arm's length): commodities padronizadas, baixo valor, arquitetura aberta, pouca interdependência. Prática: interface única, benchmarking de PREÇO, mínima assistência.
• Parceria estratégica: produtos customizados, alto valor, arquitetura fechada, muitas interações. Prática: múltiplas interfaces, benchmarking de CAPACIDADES, investimento pesado em troca de conhecimento.
Caso Walmart: exige cortes de preço ano após ano (adversarial) MAS ajuda o fornecedor a ganhar eficiência (cooperativo) — os dois lados coexistem.

═══ EFEITO CHICOTE / FORRESTER (Figura 8.15) ═══
A demanda real do consumidor é estável, mas os pedidos oscilam cada vez mais ao subir a cadeia (varejista → distribuidor → fabricante → fornecedor). Causa: cada elo decide pelo pedido do elo seguinte, não pelo consumo real. Metáfora: "telefone sem fio" (Chinese whispers).
As 4 causas amplificadoras:
1. Previsão de demanda imprecisa (todos somam margem de segurança).
2. Pedidos em lote (order batching) — diário/semanal/mensal cria picos.
3. Flutuação de preços — promoções fazem comprar além da necessidade.
4. Racionamento e jogo de escassez (shortage gaming) — comprar demais na iminência de falta.
Controle (Tabela 8.5): compartilhar informação (POS, EDI), alinhar o canal (preço, transporte, estoque, propriedade) e eficiência operacional. Caso clássico: fraldas Pampers da P&G.

═══ ABORDAGENS AVANÇADAS ═══
• VMI (Vendor-Managed Inventory): o fornecedor gere o estoque do comprador com dados compartilhados (POS/EDI). O pedido ainda parte do comprador, mas o custo de transação passa ao fornecedor. Reduz rupturas e incerteza. Ex: Tesco.
• Suprimento enxuto (lean) vs ágil (agile): lean para demanda estável/previsível, ciclos longos, foco em preço (commodities). Ágil para demanda volátil, moda/tech, ciclos curtos, foco em disponibilidade.
• Leagile: enxuto a montante + ágil a jusante, unidos no ponto de desacoplamento.
• Ponto de desacoplamento (Figuras 8.18/8.19): separa o push (produção por previsão) do pull (produção por pedido real). É onde fica o buffer e onde ocorre a diferenciação por postponement. Quanto mais cedo o ponto, mais make-to-order (ex: Dell); quanto mais tarde, mais make-to-stock.
• 3PL / TPL (logística terceirizada): passar toda a operação logística a um especialista externo (DHL, Maersk). Como o VMI, mas com a operação logística inteira.

═══ MATERIAL COMPLEMENTAR (links) ═══
• Nissan/chips (CNBC 2021) · Retail overstock (CBS 2022) · Walmart/fornecedores (Deli Market News) · VMI (Source Atlantic).

═══ RESUMO DA SEMANA ═══
Exploramos as fontes de risco na cadeia (falta, excesso, atraso, falta de informação) e as estratégias para gerenciá-lo: melhores relações com fornecedores (Kraljic, parceria) e mais compartilhamento de informação (contra o chicote). Concluímos com a ideia de deixar o fornecedor gerir o estoque nas instalações do comprador (VMI) — o que abre a próxima semana, sobre gestão de estoque.

═══ FONTES ═══

📖 Ebook — EBOOK_ Operations Management 2_e.pdf (Paton, Clegg, Hsuan & Pilkington), Capítulo 8
   → pp. 248–255 (Matriz de Kraljic, Figura 8.1, 4 táticas de compra; adaptada de Kraljic 1983)
   → pp. 255–266 (Relações com fornecedores: braço estendido vs parceria estratégica, Tabela 8.1; lean vs agile supply, Fisher 1997)
   → pp. 266–270 (Efeito chicote / Forrester, Figura 8.15; 4 causas; framework de coordenação Tabela 8.5, Lee et al. 1997; caso P&G Pampers)
   → pp. 271–278 (Combinar lean+agile = leagile; ponto de desacoplamento push/pull, Figuras 8.18/8.19, Mason-Jones et al. 2000; VMI; make-to-stock/order/buy-to-order; 3PL/TPL — DHL, Maersk)

📊 Figura 8.1 (Kraljic) — lida como imagem, base para a visualização "Matriz de Compras de Kraljic" (kraljicMatrix)
📊 Figura 8.15 (bullwhip) — base para a reutilização da visualização "wave" (Efeito Chicote)
📊 Tabela 8.1 — base para a visualização "Braço Estendido vs Parceria" (armsVsPartnership)
📊 Figuras 8.18/8.19 (desacoplamento) — base para a visualização "Ponto de Desacoplamento" (decouplingPoint)

🎬 Materiais do curso (Coursera, Week 6): report/vídeo Nissan (Shead, CNBC 2021); atividade oversupply (Evans, CBS 2022); atividade Walmart (De Leon Chavez, Deli Market News); atividade VMI (Source Atlantic).

📝 Conteúdo estruturado a partir das telas do curso enviadas pelo usuário + leitura do ebook (Capítulo 8, pp. 248–278).`,
    en: `═══ OVERVIEW ═══
Week 5 drew the network. Now we manage its links, focusing on RISK and RELATIONSHIPS. Two big themes: (1) match the type of supplier relationship to the item's risk (Kraljic) and (2) tame the information distortion that creates the bullwhip effect. We close with approaches that push responsibility onward (VMI, agile, decoupling, 3PL).

═══ SUPPLY CHAIN RISK ═══
• Shortage (undersupply) — e.g. Nissan's chips (2021), half a million fewer cars.
• Oversupply — e.g. overstocked US stores in 2022, forcing discounts.
• Delays and lack of information — the root of almost every mismatch.
→ The defence is always the same: better relationships + more information sharing.

═══ KRALJIC'S MATRIX (Figure 8.1) ═══
Classifies purchased items by crossing 2 axes:
• Vertical = impact on profit/business (INTERNAL factors).
• Horizontal = supply risk / market complexity (EXTERNAL factors).
The 4 quadrants and their tactics:
• ROUTINE (low impact, low risk): efficiency — many suppliers competing on cost. E.g. bolts, stationery.
• BOTTLENECK (low impact, HIGH risk): continuity — long-term contract, single reliable supplier. E.g. chips, fuel. (← Nissan case)
• LEVERAGE (HIGH impact, low risk): best deal — use buyer power and competition among several capable suppliers. E.g. car seats, e-commerce logistics.
• CRITICAL (HIGH impact, HIGH risk): cooperation — long-term partnership, single-sourcing, mutual dependence. E.g. aircraft engines, bank IT.
Golden rule: different contexts need different tactics. Limit: the matrix is tactical and optimizes ONE relationship at a time — it may sub-optimize the whole network.

═══ RELATIONSHIPS: ARM'S LENGTH vs PARTNERSHIP (Table 8.1) ═══
A spectrum from distant to deep:
• Arm's length: standardized commodities, low value, open architecture, low interdependence. Practice: single interface, PRICE benchmarking, minimal assistance.
• Strategic partnership: customized products, high value, closed architecture, many interactions. Practice: multiple interfaces, CAPABILITY benchmarking, heavy investment in knowledge-sharing.
Walmart case: demands year-on-year price cuts (adversarial) BUT helps the supplier gain efficiency (cooperative) — both sides coexist.

═══ BULLWHIP / FORRESTER EFFECT (Figure 8.15) ═══
Real consumer demand is steady, but orders swing more and more up the chain (retailer → distributor → manufacturer → supplier). Cause: each link decides from the next link's order, not real consumption. Metaphor: "Chinese whispers".
The 4 amplifying causes:
1. Inaccurate demand forecasting (everyone adds a safety margin).
2. Order batching — daily/weekly/monthly creates spikes.
3. Price fluctuation — promotions make people buy beyond need.
4. Rationing and shortage gaming — over-ordering when a shortage looms.
Control (Table 8.5): share information (POS, EDI), align the channel (price, transport, inventory, ownership) and operational efficiency. Classic case: P&G Pampers.

═══ ADVANCED APPROACHES ═══
• VMI (Vendor-Managed Inventory): the supplier manages the buyer's stock from shared data (POS/EDI). The order still comes from the buyer, but the transaction cost shifts to the supplier. Reduces stock-outs and uncertainty. E.g. Tesco.
• Lean vs agile supply: lean for stable/predictable demand, long cycles, price focus (commodities). Agile for volatile demand, fashion/tech, short cycles, availability focus.
• Leagile: lean upstream + agile downstream, joined at the decoupling point.
• Decoupling point (Figures 8.18/8.19): separates push (production to forecast) from pull (production to real order). It is where the buffer sits and where postponement differentiation happens. The earlier the point, the more make-to-order (e.g. Dell); the later, the more make-to-stock.
• 3PL / TPL (third-party logistics): hand the whole logistics operation to an external specialist (DHL, Maersk). Like VMI, but with the entire logistics operation.

═══ SUPPLEMENTARY MATERIAL (links) ═══
• Nissan/chips (CNBC 2021) · Retail overstock (CBS 2022) · Walmart/suppliers (Deli Market News) · VMI (Source Atlantic).

═══ WEEK SUMMARY ═══
We explored the sources of supply chain risk (shortage, oversupply, delay, lack of information) and the strategies to manage it: better supplier relationships (Kraljic, partnership) and more information sharing (against the bullwhip). We concluded with letting the supplier manage inventory on the buyer's premises (VMI) — which opens next week, on inventory management.

═══ SOURCES ═══

📖 Ebook — EBOOK_ Operations Management 2_e.pdf (Paton, Clegg, Hsuan & Pilkington), Chapter 8
   → pp. 248–255 (Kraljic's Matrix, Figure 8.1, 4 purchasing tactics; adapted from Kraljic 1983)
   → pp. 255–266 (Supplier relationships: arm's length vs strategic partnership, Table 8.1; lean vs agile supply, Fisher 1997)
   → pp. 266–270 (Bullwhip / Forrester effect, Figure 8.15; 4 causes; coordination framework Table 8.5, Lee et al. 1997; P&G Pampers case)
   → pp. 271–278 (Combining lean+agile = leagile; push/pull decoupling point, Figures 8.18/8.19, Mason-Jones et al. 2000; VMI; make-to-stock/order/buy-to-order; 3PL/TPL — DHL, Maersk)

📊 Figure 8.1 (Kraljic) — read as an image, basis for the "Kraljic's Tactical Procurement Matrix" visualization (kraljicMatrix)
📊 Figure 8.15 (bullwhip) — basis for reusing the "wave" visualization (Bullwhip Effect)
📊 Table 8.1 — basis for the "Arm's Length vs Partnership" visualization (armsVsPartnership)
📊 Figures 8.18/8.19 (decoupling) — basis for the "Decoupling Point" visualization (decouplingPoint)

🎬 Course materials (Coursera, Week 6): Nissan report/video (Shead, CNBC 2021); oversupply activity (Evans, CBS 2022); Walmart activity (De Leon Chavez, Deli Market News); VMI activity (Source Atlantic).

📝 Content structured from the course screens sent by the user + ebook reading (Chapter 8, pp. 248–278).`
  }
};
