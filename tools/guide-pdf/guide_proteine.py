# -*- coding: utf-8 -*-
"""Guida 1 — Proteine: la guida pratica."""
from design import *
from common import *

KEY = 'guida-proteine'


def ch(n, title, dark=True):
    return [PageBreak(), Chapter(n, title, dark=dark, toc_text=f'{n}  ·  {title}')]


def qa(tag, question, answer):
    """Domanda frequente con etichetta (MITO / VERITÀ / DIPENDE)."""
    col = {'MITO': '#C94B3C', 'VERITÀ': '#3155FF', 'DIPENDE': '#575A68'}[tag]
    tagp = Paragraph(f"<font name='BodyXB' size='7' color='{col}'>{tag}</font>", STYLES['body'])
    body = [Paragraph(f"<font name='SerifSB' size='14.5'>{question}</font>", ParagraphStyle('q', leading=17, spaceAfter=3)),
            Paragraph(answer, STYLES['body'])]
    t = Table([[tagp, body]], colWidths=[20 * mm, CONTENT_W - 20 * mm])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (0, 0), 9),
        ('LINEBELOW', (0, 0), (-1, -1), 0.5, LINE),
    ]))
    return KeepTogether([t])


def build_story(D):
    S = []
    kg = D.protein_table['gPerKg']
    tbl = D.protein_table['byLevel']
    weights = D.protein_table['weights']
    lvl_names = {'sedentario': 'Sedentario', 'leggero': 'Leggero', 'moderato': 'Moderato',
                 'intenso': 'Intenso', 'atleta': 'Atleta'}
    lvl_desc = {l['id']: l['label'].split('(')[1].rstrip(')') for l in D.activity_levels}

    # ------------------------------------------------------------ cover + indice
    S += cover(KEY)
    S += intro_page(None, [
        'Leggila in ordine la prima volta: i capitoli si appoggiano l\'uno sull\'altro.',
        'Quando hai fatto il punto, usa la <b>scheda del capitolo 7</b>: è pensata per essere stampata.',
        'I numeri sono quelli del database di Gustoscopio, gli stessi degli strumenti online: '
        'puoi rifare ogni calcolo e cambiare i valori con i tuoi.',
    ])

    # ------------------------------------------------------------ 01
    S += ch('01', 'A cosa servono le proteine')
    S += [
        P('Le proteine sono il materiale con cui il corpo si costruisce e si ripara. Non solo i muscoli: quasi tutto ciò che '
          'si muove, si difende o si rigenera dentro di te ne contiene.', 'lead'),
        Callout('quick', 'Le proteine sono lunghe catene di <b>aminoacidi</b>. Il corpo ne usa 20 tipi: 9 sono '
                         '<b>essenziali</b>, cioè non riesce a produrli da solo e devono arrivare dal cibo. '
                         'Per questo contano sia la <b>quantità</b> sia la <b>varietà</b> delle fonti.'),
        P('Non solo muscoli', 'h2'),
        P('Le proteine entrano in quasi ogni funzione dell\'organismo:'),
    ]
    S += bullets([
        '<b>Struttura.</b> Muscoli, pelle, capelli, unghie, tessuti connettivi: la parte solida di un corpo è in gran parte proteica.',
        '<b>Enzimi.</b> Sono le molecole che rendono possibili la digestione e il metabolismo.',
        '<b>Ormoni e messaggeri.</b> L\'insulina, per esempio, è una proteina.',
        '<b>Difese.</b> Gli anticorpi del sistema immunitario sono proteine.',
        '<b>Trasporto.</b> L\'emoglobina porta l\'ossigeno nel sangue.',
    ])
    S += [
        P('Un materiale che si rinnova di continuo', 'h2'),
        P('Il corpo demolisce e ricostruisce proteine tutto il giorno (i fisiologi lo chiamano <i>turnover</i>). Una parte degli '
          'aminoacidi viene riciclata, un\'altra si perde e va rimpiazzata con l\'alimentazione. Il corpo non ha un vero '
          'deposito di proteine come lo ha per i grassi: i muscoli sono tessuto funzionale, non una dispensa. '
          'Per questo l\'apporto regolare, giorno dopo giorno, conta più di un pasto eccezionale.'),
        P('Quanta energia danno', 'h2'),
        P('Come i carboidrati, 1 g di proteine apporta circa <b>4 kcal</b> (i grassi circa 9). Le proteine possono fornire '
          'energia, ma quando carboidrati e grassi bastano vengono usate soprattutto per costruire e mantenere i tessuti.'),
        Spacer(1, 2 * mm),
        Callout('myth', [P('<b>Più proteine, più muscoli?</b> Non in modo automatico. Il muscolo cresce se c\'è uno stimolo '
                           'allenante (di solito un lavoro di resistenza) e un\'energia complessiva sufficiente. Mangiare '
                           'più proteine, da solo, non basta: è il principio spiegato anche nell\'articolo '
                           '“Quante proteine servono davvero?” di Gustoscopio.', 'callout')]),
    ]

    # ------------------------------------------------------------ 02
    S += ch('02', 'Quante ne servono davvero')
    S += [
        P('La risposta onesta è un intervallo, non un numero. Dipende da peso, attività e momento di vita.', 'lead'),
        NumberRow([('0,83', 'g per kg al giorno: riferimento EFSA per un adulto sano'),
                   ('0,8–2,2', 'g per kg: gli intervalli indicativi dello strumento Gustoscopio'),
                   ('2×', 'il riferimento: apporti regolari in adulti sani e attivi, considerati sicuri da EFSA')]),
        Spacer(1, 3 * mm),
        P('Il punto di partenza ufficiale in Europa è quello dell\'EFSA, l\'autorità europea per la sicurezza alimentare: '
          '<b>0,83 g di proteine per kg di peso corporeo al giorno</b> per gli adulti. Per una persona di 70 kg sono circa '
          '58 g. È una soglia pensata per <i>evitare carenze</i> nella popolazione, non un obiettivo per chi ha esigenze '
          'particolari: chi si allena, chi è in deficit calorico o chi è più avanti con gli anni si colloca spesso più in alto.'),
    ]
    S += [P('I tuoi intervalli', 'h2'),
          P('Lo strumento <b>Proteine</b> di Gustoscopio usa questi intervalli, per livello di attività. Le colonne a destra '
            'sono i grammi al giorno, già calcolati per alcuni pesi.')]
    rows = []
    for lid in ['sedentario', 'leggero', 'moderato', 'intenso', 'atleta']:
        lo, hi = kg[lid]
        cells = [f"<b>{lvl_names[lid]}</b><br/><font size='7' color='#575A68'>{esc(lvl_desc[lid])}</font>",
                 f'{fmt(lo)}–{fmt(hi)}']
        for i, w in enumerate(weights):
            r = tbl[lid][i]
            cells.append(f"{r['low']}–{r['high']}")
        rows.append(cells)
    S.append(data_table(['Livello di attività', 'g/kg'] + [f'{w} kg' for w in weights], rows,
                        [52 * mm, 20 * mm] + [19.6 * mm] * 5, num_cols=(1, 2, 3, 4, 5, 6), bold_first=False))
    r75 = tbl['moderato'][weights.index(75)]
    S += [
        Spacer(1, 4 * mm),
        Callout('tip', [P(f'<b>Come si calcola.</b> Peso in kg × grammi per kg = grammi al giorno. '
                          f'Esempio: 75 kg, attività moderata (1,2–1,6 g/kg): 75 × 1,2 = <b>{r75["low"]} g</b> e '
                          f'75 × 1,6 = <b>{r75["high"]} g</b>. L\'intervallo è quindi <b>{r75["low"]}–{r75["high"]} g al giorno</b>. '
                          'Per iniziare, punta al centro dell\'intervallo, non a un estremo.', 'callout')]),
        Spacer(1, 3 * mm),
    ]
    S += [
        P('Dove ti collochi nell\'intervallo', 'h2'),
        P('L\'intervallo è ampio apposta. Questa tabella dà un ordine di grandezza su come scegliere il punto: è una guida, '
          'non una prescrizione.'),
        data_table(['Situazione', 'Dove collocarsi', 'Perché'], [
            ['Prima volta che fai i conti', 'Centro', 'Ti lascia margine per aggiustare in entrambe le direzioni.'],
            ['Attività leggera, nessun obiettivo particolare', 'Parte bassa', 'Il fabbisogno resta vicino al riferimento.'],
            ['Allenamento di forza regolare', 'Centro-alta', 'Lo stimolo allenante aumenta la richiesta di aminoacidi.'],
            ['Deficit calorico', 'Centro-alta', 'Aiuta la sazietà e la conservazione della massa magra.'],
            ['Oltre i 65 anni e attivo', 'Centro-alta, con il medico', 'Il muscolo risponde meno allo stimolo proteico.'],
            ['Alimentazione interamente vegetale', 'Centro-alta, con varietà', 'Digeribilità e profilo aminoacidico delle fonti.'],
        ], [58 * mm, 40 * mm, 72 * mm]),
        Spacer(1, 5 * mm),
        Callout('tip', [P('<b>Non è un esame quotidiano.</b> Non serve centrare il numero ogni giorno: conta la media di una '
                          'settimana. Un giorno un po\' sotto e uno un po\' sopra si compensano.', 'callout')]),
        Spacer(1, 3 * mm),
        Callout('note', [P('<b>Quando serve un professionista.</b> Gravidanza e allattamento (i fabbisogni aumentano), malattie '
                           'renali o epatiche, adolescenti in crescita, persone anziane fragili, disturbi del comportamento '
                           'alimentare. Con un sovrappeso importante il calcolo sul peso attuale può sovrastimare il bisogno: '
                           'in questi casi il peso di riferimento va scelto insieme a un professionista.', 'callout')]),
    ]

    # ------------------------------------------------------------ 03
    S += ch('03', 'Dove si trovano')
    S += [
        P('Lo stesso alimento si può guardare in tre modi. Cambiare punto di vista cambia la conclusione.', 'lead'),
        Callout('quick', [P('<b>Per 100 g</b> è quello che leggi in etichetta. <b>Per porzione</b> è quello che mangi davvero. '
                            '<b>Per 100 kcal</b> dice quanta proteina “porta” ogni caloria: la densità proteica.', 'callout')]),
        P('Quante proteine in una porzione', 'h2'),
        P('La tabella parte dalla porzione di riferimento (stile LARN/CREA, indicativa) e aggiunge una colonna utile: '
          'quanti grammi servono per arrivare a <b>20 g di proteine</b>, una quantità tipica per un pasto principale.'),
    ]
    groups = [
        ('Carne e salumi', [('pollo', 100, ''), ('tacchino', 100, ''), ('manzo', 100, ''), ('vitello', 100, ''),
                            ('prosciutto-crudo', 50, ''), ('bresaola', 50, '')]),
        ('Pesce', [('tonno', 80, ''), ('merluzzo', 150, ''), ('salmone', 150, ''), ('gamberi', 150, '')]),
        ('Uova e latticini', [('uova', 50, '1 uovo'), ('albume', 100, 'circa 3 albumi'), ('yogurt-greco-0', 125, ''),
                              ('fiocchi-latte-0', 100, ''), ('mozzarella', 100, ''), ('parmigiano', 50, ''),
                              ('latte-scremato', 125, '')]),
        ('Legumi e proteine vegetali', [('lenticchie', 150, ''), ('ceci', 150, ''), ('fagioli', 150, ''),
                                        ('edamame', 100, ''), ('tofu', 100, ''), ('tempeh', 100, ''), ('seitan', 100, '')]),
        ('Cereali, pane, frutta secca', [('pasta', 80, 'a crudo'), ('pane', 50, ''), ('avena', 40, ''), ('mandorle', 30, '')]),
    ]
    rows = []
    for gname, items in groups:
        rows.append(('__group__', gname))
        for fid, grams, note in items:
            f = D.food(fid)
            c = D.calc(fid, grams)
            need = round(20 / f['protein'] * 100 / 5) * 5 if f['protein'] > 0 else None
            nm = esc(f['name']) + (f" <font size='7' color='#575A68'>· {note}</font>" if note else '')
            rows.append([nm, f'{grams} g', fmt(c['protein']), str(c['kcal']), f'{need} g'])
    S.append(data_table(['Alimento', 'Porzione', 'Proteine (g)', 'kcal', 'Per 20 g di proteine'], rows,
                        [66 * mm, 22 * mm, 26 * mm, 20 * mm, 36 * mm], num_cols=(1, 2, 3, 4)))
    S += [
        Spacer(1, 2.5 * mm),
        P('Porzioni indicative; i grammi per 20 g di proteine sono arrotondati a 5 g. Valori dal database Gustoscopio: '
          'il contenuto reale varia con marca, taglio e cottura.', 'small'),
        Spacer(1, 3 * mm),
        Callout('note', [P('<b>Crudo o cotto?</b> Cuocendo, il cibo perde acqua: 100 g di carne cotta contengono più proteine '
                           'di 100 g di carne cruda, perché sono più “concentrati”. Per questo confrontare per 100 g alimenti in '
                           'stati diversi può ingannare. Il confronto <b>per 100 kcal</b> è molto meno sensibile alla cottura, '
                           'perché acqua e proteine per 100 g aumentano insieme: è quello che usiamo nel grafico qui sotto.',
                           'callout')]),
    ]
    dens = [('tacchino', 'animale'), ('tonno', 'animale'), ('merluzzo', 'animale'), ('gamberi', 'animale'),
            ('albume', 'animale'), ('bresaola', 'animale'), ('pollo', 'animale'), ('fiocchi-latte-0', 'animale'),
            ('yogurt-greco-0', 'animale'), ('seitan', 'vegetale'), ('tempeh', 'vegetale'), ('tofu', 'vegetale'),
            ('salmone', 'animale'), ('uova', 'animale'), ('edamame', 'vegetale'), ('lenticchie', 'vegetale'),
            ('ceci', 'vegetale'), ('pasta', 'vegetale'), ('mandorle', 'vegetale')]
    items = []
    for fid, kind in dens:
        f = D.food(fid)
        v = f['protein'] / f['kcal'] * 100
        items.append((f['name'], v, BLUE if kind == 'animale' else BLUE_SOFT, f'{fmt(v)} g'))
    items.sort(key=lambda x: -x[1])
    S.append(KeepTogether([
        P('Proteine per 100 kcal', 'h2'),
        P('Quanta proteina compri con ogni 100 kcal. <b>Non è una classifica di valore</b>: i legumi portano fibre e '
          'carboidrati, la frutta secca grassi e micronutrienti, la pasta energia. Dice solo quanto “spazio calorico” '
          'occupano le proteine, utile quando devi arrivare al tuo totale senza superare l\'energia disponibile.'),
        Spacer(1, 2 * mm),
        HBar(items, label_w=56 * mm, max_val=max(i[1] for i in items)),
        Spacer(1, 1.5 * mm),
        P("<font color='#3155FF' size='13'><b>•</b></font> origine animale &nbsp;&nbsp; "
          "<font color='#A9B8FF' size='13'><b>•</b></font> origine vegetale (compresi cereali e frutta secca)", 'small'),
    ]))
    S.append(Spacer(1, 3 * mm))
    hidden = [('pasta', 80), ('pane', 50), ('avena', 40), ('mandorle', 30)]
    tot_hidden = sum(D.calc(f, g)['protein'] for f, g in hidden)
    parts = ', '.join(f"{g} g di {esc(D.food(f)['name']).lower()} {fmt(D.calc(f, g)['protein'])} g" for f, g in hidden)
    S.append(Callout('tip', [P(f'<b>Le proteine “nascoste”.</b> Cereali e frutta secca non sono fonti proteiche principali, '
                               f'ma si sommano: {parts}. In totale <b>{fmt(tot_hidden)} g</b>, senza aver messo nel piatto '
                               'nemmeno un alimento “proteico”. Ricordalo quando fai i conti.', 'callout')]))

    # ------------------------------------------------------------ 04
    S += ch('04', 'Animali e vegetali')
    S += [
        P('Non è una gara. Fonti diverse portano, insieme alle proteine, cose diverse.', 'lead'),
        Callout('quick', [P('Le proteine animali contengono tutti gli aminoacidi essenziali in proporzioni molto favorevoli. '
                            'Molte fonti vegetali ne hanno uno o due in quantità più limitata (i cereali sono più poveri di '
                            '<b>lisina</b>, i legumi di <b>metionina</b>). Variando le fonti nell\'arco della giornata i conti '
                            'tornano: <b>non serve abbinarli nello stesso pasto</b>.', 'callout')]),
        P('Le fonti vegetali, numeri alla mano', 'h2'),
    ]
    veg = ['lenticchie', 'ceci', 'fagioli', 'piselli', 'edamame', 'tofu', 'tofu-affumicato', 'tempeh', 'seitan']
    rows = []
    for fid in veg:
        f = D.food(fid)
        rows.append([esc(f['name']), fmt(f['protein']), str(f['kcal']), fmt(f['fiber'])])
    S.append(data_table(['Alimento (per 100 g)', 'Proteine (g)', 'kcal', 'Fibre (g)'], rows,
                        [82 * mm, 30 * mm, 28 * mm, 30 * mm], num_cols=(1, 2, 3)))
    S += [
        Spacer(1, 2 * mm),
        P('Legumi indicati come “cotti” nel database. Tofu, tempeh e seitan variano molto per marca e preparazione: '
          'controlla sempre l\'etichetta del prodotto che compri.', 'small'),
        P('Le accoppiate che funzionano', 'h2'),
        P('Cereali e legumi si completano, ed è una tradizione che l\'Italia conosce bene (pasta e ceci, riso e piselli, '
          'pane e fagioli). Alcune ricette già presenti nella sezione Ricette, con valori per 1 porzione:'),
    ]
    rec_ids = ['farro-ceci-verdure', 'fagioli-umido-pane-integrale', 'riso-edamame-verdure-saltate',
               'buddha-bowl-quinoa-ceci', 'pasta-legumi-zucchine-pomodoro']
    rows = []
    for rid in rec_ids:
        r = D.recipe(rid)
        t = r['totals']
        rows.append([esc(r['name']), esc(r['category']), fmt(t['protein']), fmt(t['fiber']), str(t['kcal'])])
    S.append(data_table(['Ricetta', 'Pasto', 'Proteine (g)', 'Fibre (g)', 'kcal'], rows,
                        [70 * mm, 30 * mm, 26 * mm, 22 * mm, 22 * mm], num_cols=(2, 3, 4)))
    S += [
        P('Mangiare vegetale: tre attenzioni', 'h2'),
    ]
    S += bullets([
        '<b>Il totale.</b> Con fonti meno concentrate è facile restare sotto il tuo intervallo: controlla i conti per qualche giorno.',
        '<b>La varietà.</b> Legumi ogni giorno, soia e derivati, cereali integrali, frutta secca e semi.',
        '<b>La vitamina B12.</b> Non è presente negli alimenti vegetali non fortificati: se la tua alimentazione è interamente '
        'vegetale, parlane con un professionista.',
    ])
    S += [P('Tre piatti per iniziare', 'h2'),
          P('Piatti vegani già presenti nella sezione Ricette, con i valori per 1 porzione (il procedimento lo trovi lì).')]
    for rid in ['tofu-saltato-verdure', 'seitan-piastra-verdure', 'lenticchie-stufate']:
        S.append(recipe_card(rid, D, CONTENT_W))
    iso = D.calc('proteine-isolate', 30)
    S += [
        P('E le proteine in polvere?', 'h2'),
        P(f'Sono un alimento concentrato e comodo: 30 g di proteine isolate (dal database) apportano <b>{fmt(iso["protein"])} g '
          f'di proteine e {iso["kcal"]} kcal</b>. Non servono se il cibo copre già il tuo intervallo; possono aiutare quando '
          'arrivare al totale è complicato (poco tempo, poco appetito, allenamenti intensi). Scegli prodotti con etichetta '
          'chiara su ingredienti e contenuto, e ricorda che restano un alimento, non un “potenziatore”.'),
    ]

    # ------------------------------------------------------------ 05
    S += ch('05', 'Come distribuirle nella giornata')
    S += [
        P('Il totale giornaliero è il numero che conta. La distribuzione è il dettaglio che lo rende più facile da raggiungere.', 'lead'),
        Callout('quick', [P('Molte ricerche indicano che circa <b>20–40 g di proteine per pasto</b> stimolano bene la sintesi '
                            'proteica muscolare. Non è una soglia magica: ciò che eccede non è “sprecato”, ma il vantaggio '
                            'aggiuntivo per singolo pasto tende a ridursi. Distribuire su 3–4 occasioni è un modo pratico '
                            'per arrivare al totale.', 'callout')]),
        P('La colazione, dove si perdono i grammi più facili', 'h2'),
    ]
    b_ita = D.meal([('biscotti', 30)])
    b_prot = D.recipe('muesli-yogurt-greco-mirtilli')['totals']
    S += [
        P(f'Un caffè con 30 g di biscotti secchi apporta <b>{fmt(b_ita["protein"])} g di proteine</b> e {b_ita["kcal"]} kcal. '
          f'Yogurt greco 0%, muesli e mirtilli: <b>{fmt(b_prot["protein"])} g</b> e {b_prot["kcal"]} kcal. '
          'La prima è una scelta legittima, e per molti è un rito; ma se l\'obiettivo è arrivare al totale, la colazione è '
          'spesso il punto in cui si lasciano per strada 15–20 g “facili”.'),
        P('Due giornate, lo stesso intervallo', 'h2'),
    ]
    band = (r75['low'], r75['high'])
    S.append(P(f'Persona di 75 kg, attività moderata: intervallo <b>{band[0]}–{band[1]} g</b> (dallo strumento). Due esempi '
               'illustrativi, <b>non piani alimentari</b>: mostrano solo come i grammi si distribuiscono. Le kcal totali non '
               'sono l\'obiettivo dell\'esempio: pane, frutta, verdura, olio e altri alimenti completano l\'energia della giornata.'))

    def rec_parts(rid):
        return [(i['foodId'], i['grams']) for i in D.recipe(rid)['ingredients']]

    def desc(parts):
        return ', '.join(f"{esc(D.food(f)['name']).lower()} {g} g" for f, g in parts)

    day_omni = [
        ('Colazione', rec_parts('muesli-yogurt-greco-mirtilli')),
        ('Pranzo', rec_parts('pasta-tonno-pomodoro')),
        ('Spuntino', [('mela', 150), ('mandorle', 20)]),
        ('Cena', rec_parts('merluzzo-patate-finocchi')),
    ]
    day_veg = [
        ('Colazione', [('avena', 50), ('bevanda-soia', 200), ('mirtilli', 50), ('noci', 15)]),
        ('Pranzo', rec_parts('lenticchie-stufate') + [('pane', 60)]),
        ('Spuntino', [('edamame', 100), ('mela', 150), ('mandorle', 20)]),
        ('Cena', rec_parts('seitan-piastra-verdure') + [('quinoa', 120)]),
    ]

    def day_block(title, day):
        segs, rows, tot = [], [], 0.0
        shades = [BLUE, BLUE_SOFT, NIGHT, BLUE]
        for i, (nm, parts) in enumerate(day):
            m = D.meal(parts)
            tot += m['protein']
            segs.append((nm, m['protein'], shades[i], f"{fmt(m['protein'])} g"))
            rows.append([nm, desc(parts), fmt(m['protein'])])
        out = [P(title, 'h3'),
               StackedDay(segs, f'{fmt(tot)} g di proteine', band=band, band_label=f'Intervallo indicativo: {band[0]}–{band[1]} g'),
               data_table(['Pasto', 'Composizione', 'Proteine (g)'], rows, [24 * mm, 122 * mm, 24 * mm], num_cols=(2,))]
        return out, tot

    b1, t1 = day_block('GIORNATA ONNIVORA', day_omni)
    b2, t2 = day_block('GIORNATA VEGETALE', day_veg)
    print(f'  [proteine] giornata onnivora {t1:.1f} g · vegetale {t2:.1f} g · intervallo {band}')
    S += b1 + [Spacer(1, 4 * mm)] + b2

    S += [
        P('Quattro regole pratiche', 'h2'),
    ]
    S += bullets([
        '<b>Parti dalla colazione.</b> È il pasto dove si guadagna di più con meno fatica.',
        '<b>Una fonte proteica a ogni pasto principale.</b> Come ordine di grandezza, una porzione di carne o pesce è grande '
        'quanto il palmo della mano (stima a occhio, con un buon margine d\'errore).',
        '<b>Gli spuntini possono aiutare</b> se ti fanno arrivare al totale: yogurt, fiocchi di latte, uova, frutta secca.',
        '<b>Dopo l\'allenamento non c\'è fretta assoluta.</b> La cosiddetta “finestra anabolica” è molto più ampia di quanto '
        'si pensava: conta il totale della giornata.',
    ])

    # ------------------------------------------------------------ 06
    S += ch('06', 'Sei domande frequenti')
    S += [
        qa('MITO', 'Oltre i 30 g a pasto le proteine si sprecano?',
           'Non vengono “buttate”: gli aminoacidi in più vengono usati per altre funzioni o come energia. Cambia il '
           'rendimento, non l\'esistenza dell\'effetto: dopo una certa dose il vantaggio aggiuntivo sulla sintesi muscolare '
           'per singolo pasto diventa piccolo.'),
        qa('DIPENDE', 'Le proteine fanno male ai reni?',
           'In persone con reni sani non ci sono evidenze di danno con apporti nell\'ordine di quelli descritti in questa guida; '
           'l\'EFSA considera sicuri apporti fino al doppio del riferimento in adulti sani e attivi. Il discorso cambia se c\'è '
           'una malattia renale: in quel caso la quantità la decide il medico o il nefrologo. Se non sei sicuro della '
           'funzionalità dei tuoi reni, chiedi prima.'),
        qa('MITO', 'Servono per forza gli integratori?',
           'No. Il cibo, di norma, basta. Le proteine in polvere sono una comodità utile in certi casi, non una necessità.'),
        qa('DIPENDE', 'Le proteine fanno dimagrire?',
           'Da sole no: nessun singolo nutriente “brucia grasso”. Ma in un deficit calorico una quota proteica adeguata aiuta '
           'la sazietà e la conservazione della massa magra, e questo rende il percorso più sostenibile.'),
        qa('MITO', 'Le proteine vegetali valgono meno di quelle animali?',
           'Hanno un profilo di aminoacidi diverso e, in genere, una digeribilità un po\' inferiore. Con varietà e quantità '
           'adeguate coprono bene i fabbisogni: conta il quadro complessivo, non l\'origine della singola fonte.'),
        qa('DIPENDE', 'Devo pesare tutto?',
           'Per iniziare no. Usa le porzioni della tabella del capitolo 3: una fonte proteica a pasto ti porta già nella zona '
           'giusta. Pesare per qualche settimana può servire a “tarare l\'occhio”; poi, se vuoi, puoi smettere.'),
    ]

    # ------------------------------------------------------------ 07 scheda (versione chiara, pensata per la stampa)
    S += ch('07', 'La tua scheda', dark=False)
    S += [
        P('Da stampare o da compilare a schermo. Serve a trasformare i numeri di questa guida in una giornata concreta.', 'lead'),
        FillLine('Il mio peso (kg):', .45), FillLine('Il mio livello di attività:', .8),
        FillLine('Il mio intervallo indicativo (g/kg):', .8, hint='vedi tabella del capitolo 2'),
        FillLine('Il mio intervallo in grammi al giorno:', .8, hint='peso × g/kg'),
        Spacer(1, 3 * mm),
        P('La mia giornata', 'h2'),
    ]
    blank = [['Colazione', '', '', ''], ['Pranzo', '', '', ''], ['Spuntino', '', '', ''], ['Cena', '', '', ''],
             [Paragraph('<b>Totale</b>', STYLES['cell']), '', '', '']]
    t = Table([[Paragraph(esc(h).upper(), STYLES['th']) for h in ['Pasto', 'Fonte di proteine', 'Quantità', 'Proteine (g)']]] + [
        [Paragraph(str(c), STYLES['cellb']) if isinstance(c, str) else c for c in row] for row in blank],
        colWidths=[26 * mm, 84 * mm, 30 * mm, 30 * mm], rowHeights=[7.5 * mm] + [10.5 * mm] * 5)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NIGHT), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                           ('LINEBELOW', (0, 1), (-1, -1), 0.5, MUTED), ('LEFTPADDING', (0, 0), (-1, -1), 5),
                           ('BACKGROUND', (0, 5), (-1, 5), SAND)]))
    S += [t, Spacer(1, 3 * mm), P('Prima di chiudere', 'h2')]
    S += [
        CheckItem('Ho calcolato il mio intervallo (con la tabella o con lo strumento Proteine).'),
        CheckItem('Ho una fonte di proteine a colazione.'),
        CheckItem('Ogni pasto principale ha una fonte proteica di circa una porzione.'),
        CheckItem('Ho tenuto conto delle proteine “nascoste” di cereali e frutta secca.'),
        CheckItem('Se la mia alimentazione è vegetale: ho legumi o soia ogni giorno e ne ho parlato con un professionista per la B12.'),
        CheckItem('Cambio una cosa sola per una settimana, poi guardo come mi sento.'),
    ]

    # ------------------------------------------------------------ chiusura
    S += closing(KEY, [
        ('Fai i tuoi conti', 'Apri lo strumento <b>Proteine</b> nella sezione Strumenti di Gustoscopio e confronta il '
                             'risultato con la tabella del capitolo 2.'),
        ('Cambia una cosa sola', 'Scegli un pasto (di solito la colazione) e aggiungi una fonte proteica per una settimana. '
                                 'Poi osserva sazietà, energia, allenamenti. Il resto viene dopo.'),
        ('Continua a esplorare', 'Nella sezione <b>Alimenti</b> trovi la scheda di ogni cibo citato qui, con lo slider per '
                                 'le quantità; in <b>Ricette</b> piatti già calcolati, filtrabili per tempo e pasto.'),
    ])
    return S
