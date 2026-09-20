# -*- coding: utf-8 -*-
"""Guida 2 — Il piatto bilanciato."""
from design import *
from common import *
from guide_proteine import ch, qa

KEY = 'guida-piatto-bilanciato'

# Nel database le patate sono in "Verdura"; nel metodo del piatto contano come carboidrati.
CARB_OVERRIDE = {'patate', 'patate-dolci'}
PROT_CATS = {'Carne', 'Pesce', 'Uova', 'Legumi', 'Latte & derivati', 'Proteine vegetali'}


def plate_groups(D, rec):
    """Grammi per gruppo del piatto, dagli ingredienti reali della ricetta."""
    g = {'V': 0, 'C': 0, 'P': 0, 'O': 0}
    for i in rec['ingredients']:
        f = D.food(i['foodId'])
        if i['foodId'] in CARB_OVERRIDE or f['category'] == 'Cereali & derivati':
            g['C'] += i['grams']
        elif f['category'] == 'Verdura':
            g['V'] += i['grams']
        elif f['category'] in PROT_CATS:
            g['P'] += i['grams']
        else:
            g['O'] += i['grams']
    return g


def build_story(D):
    S = []

    # ------------------------------------------------------------ cover + indice
    S += cover(KEY)
    S += intro_page(None, [
        'Leggila in ordine: il metodo (cap. 1) e le porzioni (cap. 2) sono la base, il resto li applica.',
        'Non serve una bilancia. Serve, per qualche giorno, <b>guardare il piatto con occhio nuovo</b>.',
        'Gli esempi sono piatti reali della sezione Ricette di Gustoscopio, con i valori calcolati dal database: '
        'puoi aprirli online, scalare le porzioni e cambiare gli ingredienti.',
        'La <b>scheda del capitolo 7</b> è pensata per essere stampata.',
    ])

    # ------------------------------------------------------------ 01
    S += ch('01', 'Il metodo del piatto')
    S += [
        P('Un modo di mangiare bene non dovrebbe richiedere una bilancia a ogni pasto. Il metodo del piatto sposta il '
          'ragionamento dai grammi alle proporzioni: guardi il piatto e sai già se è ben composto.', 'lead'),
        Plate(size=54 * mm),
        Spacer(1, 3 * mm),
        Callout('quick', [P('Metà piatto di <b>verdure e ortaggi</b>, un quarto di <b>cereali e derivati</b>, un quarto di '
                            '<b>proteine</b>, più un filo di condimento misurato. È una proporzione di <b>volume</b>, '
                            'cioè di quanto spazio occupa ogni cosa nel piatto, non di peso. È un punto di partenza per il pasto principale di un adulto in buona salute, non una regola (vedi cap. 4).', 'callout')]),
        P('Perché funziona', 'h2'),
        P('La verdura occupa molto spazio e apporta poche calorie: riempirne metà piatto porta fibre, acqua e varietà '
          'senza che il pasto diventi un problema energetico. I cereali forniscono la parte principale dell\'energia; '
          'le proteine danno sazietà e materiale per il corpo. Il condimento, poco in volume e molto in energia, va '
          'dosato.'),
    ]

    dens = [('zucchine', ''), ('mela', ''), ('patate', ''), ('ceci', ''), ('pollo', ''),
            ('pasta', ' (a crudo)'), ('mandorle', ''), ('olio', '')]
    items = []
    for fid, suffix in dens:
        f = D.food(fid)
        col = BLUE if f['kcal'] < 100 else (BLUE_SOFT if f['kcal'] < 400 else NIGHT)
        items.append((f['name'] + suffix, f['kcal'], col, f"{f['kcal']} kcal"))
    S += [
        KeepTogether([
            P('Quante calorie occupano 100 g', 'h2'),
            P('Lo stesso peso di cibo può pesare molto diversamente sull\'energia. È la ragione per cui il metodo del piatto '
              'affida il volume alla verdura.'),
            Spacer(1, 2 * mm),
            HBar(items, label_w=56 * mm, bar_h=3.6 * mm, gap=1.3 * mm, max_val=max(i[1] for i in items)),
        ]),
        Spacer(1, 1.5 * mm),
        KeepTogether([
            P('Valori del database, per 100 g; la pasta è a crudo (cotta assorbe acqua e la densità scende). Non è una classifica di valore: frutta secca e olio sono ricchi di nutrienti, vanno solo dosati.', 'small'),
        ]),

    ]

    S += [P('Tre errori comuni', 'h2')]
    S += bullets([
        '<b>La verdura come decorazione.</b> Tre foglie di insalata non sono metà piatto: se il piatto è pieno di pasta e '
        'carne, il metodo non sta funzionando.',
        '<b>Il condimento a occhio.</b> Poco in volume, molto in energia: è la parte in cui è più facile sbagliare senza '
        'accorgersene (vedi capitolo 6).',
        '<b>Confondere crudo e cotto.</b> Le porzioni di pasta e riso si riferiscono al crudo, quelle dei legumi al cotto '
        '(capitolo 2).',
    ])

    # ------------------------------------------------------------ 02
    S += ch('02', 'Le porzioni, senza bilancia')
    S += [
        P('Il piatto ti dà le proporzioni. Le porzioni ti dicono quanto mettere in ciascuna parte. Sono quelle usate dagli '
          'strumenti di Gustoscopio.', 'lead'),
    ]
    pr = D.portion_ref
    examples = [
        ('Verdura', 'zucchine'), ('Cereali & derivati', 'pasta'), ('Carne', 'pollo'), ('Pesce', 'merluzzo'),
        ('Legumi', 'ceci'), ('Uova', 'uova'), ('Latte & derivati', 'yogurt'), ('Frutta', 'mela'),
        ('Frutta secca', 'mandorle'), ('Proteine vegetali', 'tofu'), ('Condimenti', 'olio'),
    ]
    rows = []
    for cat, fid in examples:
        g = pr[cat]['grams']
        c = D.calc(fid, g)
        rows.append([cat, f'{g} g', esc(pr[cat]['note']), f"{esc(D.food(fid)['name'])}: {c['kcal']} kcal"])
    S.append(data_table(['Categoria', 'Porzione', 'Cosa significa', 'Esempio dal database'], rows,
                        [30 * mm, 18 * mm, 58 * mm, 64 * mm], num_cols=()))
    S += [
        Spacer(1, 3 * mm),
        Callout('note', [P('<b>Cereali e legumi: crudo o cotto?</b> La porzione di pasta o riso è riferita al <b>crudo</b> '
                           '(80 g). Cotti, questi alimenti pesano molto di più perché assorbono acqua. Per i legumi vale '
                           'l\'inverso: 150 g sono <b>cotti</b>, 30–50 g se secchi. Controlla sempre a quale stato '
                           'si riferisce il valore che stai leggendo.', 'callout')]),
        Spacer(1, 3 * mm),
        Callout('tip', [P('<b>Calibra l\'occhio.</b> Per qualche giorno pesa le porzioni che di solito servi a occhio. '
                          'Non per contare tutto la vita: per riconoscere a colpo d\'occhio quanto è, per te, '
                          '“80 g di pasta” o “un cucchiaio d\'olio”. Dopo una settimana la bilancia si può mettere via.',
                          'callout')]),
    ]

    # ------------------------------------------------------------ 03
    S += ch('03', 'Il metodo in pratica')
    S += [
        P('Sei piatti già presenti nella sezione Ricette, scomposti nelle tre parti del piatto. I grammi sono '
          'quelli degli ingredienti, calcolati dal database.', 'lead'),
    ]
    picks = ['pollo-riso-spinaci', 'gamberi-couscous-zucchine', 'spigola-vapore-riso-verdure',
             'farro-ceci-verdure', 'pollo-asparagi-farro', 'tacchino-riso-integrale-zucchine']
    rows = []
    for rid in picks:
        r = D.recipe(rid)
        g = plate_groups(D, r)
        rows.append([esc(r['name']), str(g['V']), str(g['C']), str(g['P']), str(g['O']), str(r['totals']['kcal'])])
    S.append(data_table(['Piatto', 'Verdure (g)', 'Cereali (g)', 'Proteine (g)', 'Condim. (g)', 'kcal'], rows,
                        [62 * mm, 21 * mm, 21 * mm, 23 * mm, 21 * mm, 14 * mm], num_cols=(1, 2, 3, 4, 5)))
    S += [
        Spacer(1, 3 * mm),
        Callout('quick', [P('<b>Perché i grammi non sono ½ – ¼ – ¼?</b> Perché il piatto misura il <b>volume</b>, non il peso. '
                            'Riso e pasta sono pesati a crudo (poi si gonfiano), la verdura è leggerissima, la carne e il '
                            'pesce sono densi. Un piatto con 150 g di verdura, 80 g di riso e 150 g di pollo ha, una volta '
                            'nel piatto, proprio le proporzioni del metodo.', 'callout')]),
        Spacer(1, 2 * mm),
        P('Nel database le patate sono classificate come verdura; qui, come nel metodo del piatto, le conto tra i '
          'carboidrati.', 'small'),
        P('Tre piatti da vedere da vicino', 'h2'),
    ]
    for rid in ['pollo-riso-spinaci', 'gamberi-couscous-zucchine', 'farro-ceci-verdure']:
        S.append(recipe_card(rid, D, CONTENT_W))

    base = [('pollo', 150), ('spinaci', 100), ('olio', 5)]
    var_rows = []
    for g in (60, 80, 120):
        m = D.meal(base + [('riso', g)])
        var_rows.append([f'Riso {g} g (a crudo)', f"{m['kcal']}", fmt(m['protein']), fmt(m['carbs'])])
    S += [
        P('Un piatto, tre porzioni di riso', 'h2'),
        P('Stesso piatto (pollo 150 g, spinaci 100 g, olio 5 g), cambia solo la quantità di riso. Serve a vedere quanto '
          'peso ha, sul totale, la parte di cereali.'),
        data_table(['Variante', 'kcal', 'Proteine (g)', 'Carboidrati (g)'], var_rows,
                   [64 * mm, 30 * mm, 38 * mm, 38 * mm], num_cols=(1, 2, 3)),
    ]

    # ------------------------------------------------------------ 04
    S += ch('04', 'Adattare il piatto')
    S += [
        P('Il metodo è una griglia, non una gabbia. Ecco come si piega alle situazioni più comuni.', 'lead'),
        data_table(['Situazione', 'Come adattare il piatto'], [
            ['Piatto unico', 'Pasta e legumi, riso e piselli, zuppe: cereali e proteine stanno nella stessa preparazione. '
                             'Aggiungi verdura di contorno per riportare il volume a metà piatto.'],
            ['Colazione e spuntini', 'Stessa logica in piccolo: una fonte di proteine (yogurt, uova, fiocchi di latte), un '
                                     'carboidrato (avena, pane) e, se ti va, frutta.'],
            ['Alimentazione vegetale', 'I legumi (o soia, tofu, tempeh) prendono il posto di carne e pesce nel quarto '
                                       'delle proteine. Vale la pena parlare con un professionista della vitamina B12.'],
            ['Sport e attività intensa', 'Di solito aumentano cereali e proteine, non le verdure: le porzioni si scalano '
                                         'in base al fabbisogno (vedi lo strumento Fabbisogno).'],
            ['Poca fame', 'Meglio porzioni più piccole di tutti i gruppi, mantenendo la proporzione, che saltare '
                          'una parte.'],
            ['Molta fame', 'Aumenta prima il volume della verdura: sazia molto e pesa poco sull\'energia.'],
        ], [40 * mm, CONTENT_W - 40 * mm]),
        Spacer(1, 4 * mm),
        Callout('note', [P('<b>Quando serve un professionista.</b> Diabete, malattie renali o gastrointestinali, '
                           'gravidanza e allattamento, disturbi del comportamento alimentare, età evolutiva: la '
                           'composizione del piatto va decisa con chi ti segue, non da una guida generale.', 'callout')]),
    ]

    # ------------------------------------------------------------ 05
    S += ch('05', 'Una giornata di piatti')
    S += [
        P('Il piatto bilanciato riguarda il singolo pasto, ma la giornata è fatta di più occasioni. Un esempio, con piatti '
          'reali del sito.', 'lead'),
    ]

    def rp(rid):
        return [(i['foodId'], i['grams']) for i in D.recipe(rid)['ingredients']]

    def desc(parts):
        return ', '.join(f"{esc(D.food(f)['name']).lower()} {g} g" for f, g in parts)

    day = [
        ('Colazione', rp('porridge-avena-mirtilli')),
        ('Pranzo', rp('farro-ceci-verdure')),
        ('Spuntino', rp('yogurt-banana-mandorle')),
        ('Cena', rp('spigola-vapore-riso-verdure') + [('mela', 150)]),
    ]
    segs, rows, tot = [], [], {'kcal': 0, 'protein': 0.0, 'fiber': 0.0}
    shades = [BLUE, BLUE_SOFT, NIGHT, BLUE]
    for i, (nm, parts) in enumerate(day):
        m = D.meal(parts)
        for k in tot:
            tot[k] += m[k]
        segs.append((nm, m['kcal'], shades[i], f"{m['kcal']}"))
        rows.append([nm, desc(parts), str(m['kcal']), fmt(m['protein']), fmt(m['fiber'])])
    rows.append([Paragraph('<b>Totale</b>', STYLES['cell']), '', Paragraph(f"<b>{int(tot['kcal'])}</b>", STYLES['cellr']),
                 Paragraph(f"<b>{fmt(tot['protein'])}</b>", STYLES['cellr']),
                 Paragraph(f"<b>{fmt(tot['fiber'])}</b>", STYLES['cellr'])])
    print(f"  [piatto] giornata: {int(tot['kcal'])} kcal · {tot['protein']:.1f} g proteine · {tot['fiber']:.1f} g fibre")
    S += [
        StackedDay(segs, f"{int(tot['kcal'])} kcal"),
        data_table(['Pasto', 'Composizione', 'kcal', 'Proteine (g)', 'Fibre (g)'], rows,
                   [22 * mm, 85 * mm, 14 * mm, 25 * mm, 24 * mm], num_cols=(2, 3, 4)),
        Spacer(1, 3 * mm),
        P(f"<b>Esempio illustrativo, non un piano alimentare.</b> L'energia giusta per te dipende da età, peso, attività: "
          f"puoi stimarla con lo strumento Fabbisogno. Questa giornata apporta circa {fmt(tot['fiber'], 0)} g di fibre: "
          f"un riferimento comune per gli adulti è di circa 25 g al giorno (EFSA), che un'alimentazione ricca di verdura, "
          f"legumi e cereali integrali rende molto più semplice da raggiungere."),
        Callout('tip', [P('<b>Il piatto non serve a controllare tutto.</b> Serve a togliere fatica: se il pranzo e la cena '
                          'seguono uno schema, le tue energie mentali restano libere per tutto il resto.', 'callout')]),
    ]

    # ------------------------------------------------------------ 06
    olio10 = D.calc('olio', 10)
    S += ch('06', 'Sei domande frequenti')
    S += [
        qa('MITO', 'Di sera i carboidrati fanno ingrassare?',
           'Non esistono prove che i carboidrati mangiati la sera siano, di per sé, più “ingrassanti”. Conta l\'energia '
           'dell\'intera giornata e come si adatta al tuo stile di vita. Per alcune persone una cena con un po\' di '
           'cereali è più sazia e più facile da gestire.'),
        qa('DIPENDE', 'Dove metto la frutta?',
           'Dipende dalla versione del metodo. In Gustoscopio la frutta ha una porzione a parte (150 g, un frutto medio) '
           'e trova posto a fine pasto o come spuntino. Se preferisci contarla nella metà “verdure”, va bene: l\'importante '
           'è che il piatto resti vario.'),
        qa('VERITÀ', 'Il condimento conta davvero?',
           f"Sì, perché è molto denso: 10 g di olio (circa un cucchiaio) apportano {olio10['kcal']} kcal. Non significa "
           'toglierlo, ma dosarlo. L\'olio è anche ciò che rende gradevole la verdura e aiuta a mangiarla.'),
        qa('DIPENDE', 'Devo pesare tutto?',
           'No. Pesare per una settimana serve a calibrare l\'occhio, poi le proporzioni del piatto bastano. Se il tuo '
           'obiettivo richiede più precisione (per esempio in ambito sportivo), la bilancia resta uno strumento utile, '
           'non un obbligo.'),
        qa('MITO', 'Il piatto unico è “sbagliato”?',
           'No. Pasta e legumi, riso con piselli, una zuppa ricca sono piatti unici che rispettano il metodo: cereali e '
           'proteine ci sono già, basta portare la verdura a fare volume (nel piatto o come contorno).'),
        qa('DIPENDE', 'Vale anche fuori casa?',
           'Sì, è proprio lì che il metodo dà il meglio: in mensa o al ristorante non hai una bilancia ma hai occhi. '
           'Ordina un contorno di verdure, chiedi il condimento a parte se vuoi dosarlo, e guarda le proporzioni.'),
    ]

    # ------------------------------------------------------------ 07
    S += ch('07', 'La tua scheda', dark=False)
    S += [
        P('Da stampare o da compilare a schermo. Serve a trasformare il metodo in tre piatti che puoi ripetere.', 'lead'),
        P('I miei tre piatti tipo', 'h2'),
    ]
    blank = [['Pranzo 1', '', '', '', ''], ['Pranzo 2', '', '', '', ''], ['Cena 1', '', '', '', ''],
             ['Cena 2', '', '', '', '']]
    t = Table([[Paragraph(esc(h).upper(), STYLES['th']) for h in ['Piatto', 'Verdura', 'Cereale', 'Proteina', 'Condimento']]] + [
        [Paragraph(str(c), STYLES['cellb']) if c else '' for c in row] for row in blank],
        colWidths=[24 * mm, 36 * mm, 36 * mm, 36 * mm, 38 * mm], rowHeights=[7.5 * mm] + [11.5 * mm] * 4)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NIGHT), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                           ('LINEBELOW', (0, 1), (-1, -1), 0.5, MUTED), ('LEFTPADDING', (0, 0), (-1, -1), 5)]))
    S += [t, Spacer(1, 4 * mm), FillLine('La porzione di pasta o riso che mi serve (g, a crudo):', .85),
          FillLine('Il condimento che uso, e quanto (cucchiai):', .85), Spacer(1, 2 * mm),
          P('Il test del piatto', 'h2'),
          P('Prima di mangiare, cinque domande.')]
    S += [
        CheckItem('C\'è verdura per circa metà del piatto?'),
        CheckItem('C\'è una fonte di carboidrati, in una porzione di riferimento?'),
        CheckItem('C\'è una fonte di proteine (carne, pesce, uova, legumi, latticini, tofu)?'),
        CheckItem('Il condimento è misurato, non a occhio nel piatto?'),
        CheckItem('Ho fame, o sto seguendo la routine? (nessuna risposta sbagliata: solo consapevolezza).'),
    ]

    # ------------------------------------------------------------ chiusura
    S += closing(KEY, [
        ('Costruisci un piatto', 'Nella home di Gustoscopio apri il <b>Plate Builder</b>: aggiungi gli alimenti e guarda '
                                 'come si compone il piatto, con i valori calcolati.'),
        ('Fai i tuoi conti', 'Nella sezione <b>Strumenti</b> trovi il <b>Fabbisogno</b>: ti dà un\'idea di quanta energia '
                             'serve a te, così scali le porzioni di questa guida.'),
        ('Continua a esplorare', 'In <b>Ricette</b> ogni piatto ha porzioni scalabili e valori già calcolati: scegline '
                                 'tre e ripetili per una settimana.'),
    ])
    return S
