# -*- coding: utf-8 -*-
"""Guida 5 — Colazione e spuntini (ricette reali del database, senza marche)."""
from design import *
from common import *
from guide_proteine import ch, qa

KEY = 'guida-colazione-spuntini'


def build_story(D):
    S = []
    clean = {r['id'] for r in clean_recipes(D)}

    def R(rid):
        assert rid in clean, f'ricetta con ingredienti di marca o inesistente: {rid}'
        return D.recipe(rid)

    breakfasts = [r for r in clean_recipes(D) if r['category'] in ('Colazione', 'Colazione/Snack', 'Colazione/Pranzo')
                  and r['totals']['kcal'] >= 240]
    snacks = [r for r in clean_recipes(D) if r['category'] == 'Snack']

    S += cover(KEY)
    S += intro_page(None, [
        'Le ricette sono quelle della sezione Ricette di Gustoscopio, con valori calcolati dal database: puoi aprirle online e scalare le porzioni.',
        'Non ci sono “colazioni giuste”: ci sono schemi che funzionano e che puoi adattare a gusti, orari e fame.',
        'La <b>scheda del capitolo 7</b> è pensata per essere stampata.',
    ])

    # ------------------------------------------------------------ 01
    S += ch('01', 'Una colazione che regge')
    S += [
        P('Non esiste una regola che dica che la colazione vada fatta a tutti i costi, né che vada saltata. Se la fai, vale '
          'la pena farla in modo che ti porti fino al pranzo senza cali.', 'lead'),
        Callout('quick', [P('<b>Tre pezzi:</b> un <b>carboidrato</b> (avena, pane, cereali), una <b>fonte di proteine</b> (yogurt, '
                            'uova, fiocchi di latte) e qualcosa che porti <b>fibre e freschezza</b> (frutta, frutta secca). '
                            'Con questi tre, quasi ogni colazione è bilanciata.', 'callout')]),
        P('I mattoncini, con le porzioni tipiche', 'h2'),
    ]
    blocks = [
        ('__group__', 'Carboidrati'),
        ('avena', 40), ('pane', 50), ('cornflakes-mais', 30),
        ('__group__', 'Proteine'),
        ('yogurt-greco-2', 125), ('fiocchi-latte-0', 125), ('uova', 50),
        ('__group__', 'Frutta e freschezza'),
        ('banana', 120), ('mirtilli', 100), ('kiwi', 100),
        ('__group__', 'Grassi buoni'),
        ('mandorle', 20), ('noci', 15),
    ]
    rows = []
    for b in blocks:
        if b[0] == '__group__':
            rows.append(b)
            continue
        fid, g = b
        c = D.calc(fid, g)
        rows.append([esc(D.food(fid)['name']), f'{g} g', str(c['kcal']), fmt(c['protein']), fmt(c['fiber'])])
    S.append(data_table(['Alimento', 'Porzione', 'kcal', 'Proteine (g)', 'Fibre (g)'], rows,
                        [62 * mm, 26 * mm, 20 * mm, 32 * mm, 30 * mm], num_cols=(1, 2, 3, 4), groups=True))
    S += [
        Spacer(1, 2 * mm),
        P('Le porzioni sono indicative e i valori dal database di Gustoscopio. Combinane uno per gruppo: per esempio 40 g di '
          'avena + 125 g di yogurt + 100 g di mirtilli.', 'small'),
    ]

    # ------------------------------------------------------------ 02
    S += ch('02', 'Tre schemi, molte varianti')
    S += [P('Dolce, proteica o salata: tre modi di comporre gli stessi pezzi. Tre ricette reali per ciascuno.', 'lead')]
    S += [P('Dolce e cremosa', 'h2'), recipe_card(R('porridge-avena-mirtilli'), D, CONTENT_W),
          Spacer(1, 2 * mm),
          P('Più proteica', 'h2'), recipe_card(R('yogurt-greco-muesli-mandorle'), D, CONTENT_W),
          Spacer(1, 2 * mm),
          P('Salata', 'h2'), recipe_card(R('toast-avocado-uovo'), D, CONTENT_W)]

    top = sorted(breakfasts, key=lambda r: -r['totals']['protein'])[:10]
    items = []
    for r in top:
        pr = r['totals']['protein']
        items.append((r['name'], pr, BLUE if pr >= 20 else BLUE_SOFT, f"{fmt(pr)} g"))
    S += [
        KeepTogether([
            P('Le dieci colazioni con più proteine', 'h2'),
            P('Tra le ricette di colazione del database (senza ingredienti di marca), per una porzione.'),
            Spacer(1, 2 * mm),
            HBar(items, label_w=78 * mm, max_val=max(i[1] for i in items)),
        ]),
        Spacer(1, 2 * mm),
        P('Più proteine non vuol dire “migliore”: dice solo quanto la colazione sazia e sostiene. Le più chiare sono '
          'quelle che ti piacciono abbastanza da ripeterle.', 'small'),
    ]

    # ------------------------------------------------------------ 03
    S += ch('03', 'Quando hai cinque minuti')
    fast = sorted([r for r in breakfasts if r['time'] <= 5], key=lambda r: r['totals']['kcal'])
    rows = [[esc(r['name']), f"{r['time']} min", str(r['totals']['kcal']), fmt(r['totals']['protein']), fmt(r['totals']['fiber'])]
            for r in fast[:10]]
    S += [
        P('La colazione che non si fa è quasi sempre quella che richiede troppo tempo. Queste sono pronte in cinque minuti o meno.', 'lead'),
        data_table(['Ricetta', 'Tempo', 'kcal', 'Proteine (g)', 'Fibre (g)'], rows,
                   [76 * mm, 20 * mm, 18 * mm, 30 * mm, 26 * mm], num_cols=(1, 2, 3, 4)),
        Spacer(1, 3 * mm),
        P('La sera prima è metà del lavoro', 'h2'),
    ]
    S += bullets([
        '<b>Overnight oats.</b> Avena, latte o kefir e frutta in un barattolo: al mattino è già pronta e si mangia fredda.',
        '<b>Porridge in anticipo.</b> Si prepara in più porzioni e si scalda con un goccio di latte.',
        '<b>Frutta e frutta secca già porzionate.</b> Un contenitore per giorno toglie la fatica di decidere alle sette del mattino.',
    ])
    S += [Callout('tip', [P('<b>Se il problema è la fame, non il tempo:</b> una colazione più proteica (yogurt greco, fiocchi di latte, '
                            'uova) tende a saziare di più di una fatta solo di carboidrati semplici.', 'callout')])]

    # ------------------------------------------------------------ 04
    S += ch('04', 'Gli spuntini')
    S += [
        P('Lo spuntino è una scelta, non un obbligo. Se ti serve, funziona meglio quando è pensato: una fonte di proteine e '
          'qualcosa di fresco o ricco di fibre.', 'lead'),
        P('Quanto pesano, in kcal, gli spuntini tipici', 'h2'),
    ]
    snack_items = []
    for fid, g in [('mela', 150), ('yogurt-greco-0', 125), ('banana', 120), ('fiocchi-latte-0', 125), ('mandorle', 30),
                   ('noci', 30), ('biscotti', 30), ('gallette-riso', 20)]:
        c = D.calc(fid, g)
        col = BLUE if c['kcal'] < 100 else (BLUE_SOFT if c['kcal'] < 160 else NIGHT)
        snack_items.append((f"{D.food(fid)['name']} {g} g", c['kcal'], col, f"{c['kcal']} kcal"))
    S += [HBar(snack_items, label_w=62 * mm, max_val=max(i[1] for i in snack_items)), Spacer(1, 2 * mm),
          P('Valori dal database, per la porzione indicata. La frutta secca è ricca di nutrienti ma molto densa: una manciata (circa 30 g) basta.', 'small'),
          P('Spuntini completi, dalle ricette', 'h2')]
    rows = [[esc(r['name']), f"{r['time']} min", str(r['totals']['kcal']), fmt(r['totals']['protein']), fmt(r['totals']['fiber'])]
            for r in sorted(snacks, key=lambda r: r['totals']['kcal'])]
    S += [
        data_table(['Ricetta', 'Tempo', 'kcal', 'Proteine (g)', 'Fibre (g)'], rows,
                   [76 * mm, 20 * mm, 18 * mm, 30 * mm, 26 * mm], num_cols=(1, 2, 3, 4)),
        Spacer(1, 3 * mm),
        Callout('note', [P('<b>Fame o abitudine?</b> Prima di mangiare uno spuntino, chiediti se hai fame o se è solo l\'ora: '
                           'nessuna risposta è sbagliata, ma la domanda aiuta a scegliere con più consapevolezza.', 'callout')]),
    ]

    # ------------------------------------------------------------ 05
    ar, su = D.food('arancia'), D.food('succo-arancia')
    ca, cs = D.calc('arancia', 150), D.calc('succo-arancia', 200)
    S += ch('05', 'Piccoli errori, facili da correggere')
    S += [
        P('Non sono errori “gravi”, ma sono le ragioni per cui una colazione che sembra sana non regge fino a pranzo.', 'lead'),
        P('Il succo non è la frutta', 'h2'),
        P('Spremere la frutta toglie gran parte delle fibre. Confronto con i valori del database:'),
        data_table(['', 'Quantità', 'kcal', 'Fibre (g)'], [
            [esc(ar['name']), '150 g (una arancia)', str(ca['kcal']), fmt(ca['fiber'])],
            [esc(su['name']), '200 ml (un bicchiere)', str(cs['kcal']), fmt(cs['fiber'])],
        ], [56 * mm, 50 * mm, 22 * mm, 34 * mm], num_cols=(2, 3)),
        Spacer(1, 3 * mm),
    ]
    S += bullets([
        '<b>Solo carboidrati semplici.</b> Fette biscottate con marmellata e un caffè: poca proteina, poca fibra, e a metà '
        'mattina è già fame. Aggiungi yogurt o un uovo.',
        '<b>Colazioni “fit” che non lo sono.</b> Leggi ingredienti e tabella (guida sulla spesa): una barretta può avere più '
        'zuccheri di un dolce.',
        '<b>Porzioni improvvisate.</b> Cereali, muesli e frutta secca sono densi: la prima volta pesali, poi impari a occhio.',
        '<b>Nessun liquido.</b> Il corpo dopo la notte ha bisogno di acqua: un bicchiere prima o insieme alla colazione aiuta.',
    ])

    # ------------------------------------------------------------ 06
    S += ch('06', 'Sei domande frequenti')
    S += [
        qa('DIPENDE', 'Saltare la colazione fa male?',
           'Non di per sé. Alcune persone non hanno fame la mattina e stanno bene; per altre una colazione aiuta a non arrivare '
           'affamate a pranzo. Conta l\'insieme della giornata e come ti senti.'),
        qa('MITO', 'La colazione deve essere dolce?',
           'No. Una colazione salata (uova, toast con avocado, formaggi freschi) è perfettamente valida e, per molti, più sazia.'),
        qa('DIPENDE', 'Serve uno spuntino di metà mattina e uno di metà pomeriggio?',
           'Non è un obbligo. Servono se ti aiutano a non arrivare troppo affamato al pasto successivo; se non hai fame, puoi farne a meno.'),
        qa('VERITÀ', 'Il succo di frutta vale come una porzione di frutta?',
           'Non allo stesso modo: si perde gran parte delle fibre e si beve in fretta. Una tantum va bene; come abitudine, meglio la frutta intera.'),
        qa('DIPENDE', 'Le proteine in polvere sono utili a colazione?',
           'Possono essere un modo comodo per arrivare al tuo intervallo proteico, ma non sono necessarie: yogurt, uova e fiocchi di latte '
           'fanno lo stesso lavoro con alimenti veri.'),
        qa('DIPENDE', 'Posso fare la stessa colazione ogni giorno?',
           'Sì, se ti piace e la alterni con frutta diversa e qualche variante. La ripetizione toglie fatica; la varietà si può inserire nella frutta e nei toppings.'),
    ]

    # ------------------------------------------------------------ 07
    S += ch('07', 'La tua scheda', dark=False)
    S += [
        P('Da stampare o da compilare a schermo: le tue tre colazioni e i tuoi spuntini, pronti da ripetere.', 'lead'),
        P('Le mie tre colazioni tipo', 'h2'),
    ]
    t = Table([[Paragraph(esc(h).upper(), STYLES['th']) for h in ['', 'Carboidrato', 'Proteine', 'Frutta / extra', 'Tempo']]] +
              [[Paragraph(x, STYLES['cellb']), '', '', '', ''] for x in ['Colazione 1', 'Colazione 2', 'Colazione 3']],
              colWidths=[30 * mm, 38 * mm, 38 * mm, 42 * mm, 22 * mm], rowHeights=[7.5 * mm] + [11.5 * mm] * 3)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NIGHT), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                           ('LINEBELOW', (0, 1), (-1, -1), 0.5, MUTED), ('LEFTPADDING', (0, 0), (-1, -1), 5)]))
    S += [t, Spacer(1, 4 * mm), P('I miei spuntini', 'h2'),
          FillLine('Spuntino veloce (2 minuti):', .95), FillLine('Spuntino più sazio:', .95), FillLine('Da avere sempre in casa:', .95),
          Spacer(1, 2 * mm), P('Prima di mangiare', 'h2')]
    S += [
        CheckItem('C\'è un carboidrato, una fonte di proteine e qualcosa di fresco o ricco di fibre?'),
        CheckItem('La porzione di cereali o frutta secca è misurata?'),
        CheckItem('Ho bevuto acqua?'),
        CheckItem('Ho fame, o è solo l\'ora dello spuntino?'),
    ]

    S += closing(KEY, [
        ('Scegli tre colazioni', 'Apri <b>Ricette</b>, filtra per Colazione e per tempo, e scegli le tre che ti fanno venire voglia di ripeterle.'),
        ('Prepara la sera prima', 'Overnight oats o frutta porzionata: cinque minuti la sera tolgono fatica al mattino.'),
        ('Confronta con Gustoscopio', 'Nella sezione <b>Confronta</b> metti a confronto due alimenti su un parametro alla volta, per esempio yogurt e fiocchi di latte.'),
    ])
    return S
