# -*- coding: utf-8 -*-
"""Guida 6 — Organizzare la settimana (piano di pranzi e cene, lista della spesa, cucinare in anticipo)."""
from collections import OrderedDict
from design import *
from common import *
from guide_proteine import ch, qa

KEY = 'guida-settimana'

# Pranzo e cena di ogni giorno: ricette REALI del sito, senza ingredienti di marca.
WEEK = [
    ('Lunedì', 'lenticchie-sedano-carote', 'merluzzo-carciofi-patate'),
    ('Martedì', 'pollo-asparagi-farro', 'fagioli-cicoria-pane'),
    ('Mercoledì', 'tofu-saltato-verdure', 'tacchino-verza-patate'),
    ('Giovedì', 'farro-ceci-verdure', 'sgombro-finocchi-arancia'),
    ('Venerdì', 'pasta-legumi-zucchine-pomodoro', 'orata-forno-patate-finocchi'),
    ('Sabato', 'orzo-verdure-mozzarella', 'manzo-cavoletti-bruxelles-patate'),
    ('Domenica', 'riso-edamame-verdure-saltate', 'ricotta-pecora-noci-mela'),
]
CAT_ORDER = ['Verdura', 'Frutta', 'Cereali & derivati', 'Legumi', 'Carne', 'Pesce', 'Uova', 'Latte & derivati',
             'Proteine vegetali', 'Frutta secca', 'Condimenti']
PROT = ['Carne', 'Pesce', 'Uova', 'Legumi', 'Latte & derivati', 'Proteine vegetali']


def main_protein_cat(D, rec):
    best = max((i for i in rec['ingredients'] if D.food(i['foodId'])['category'] in PROT),
               key=lambda i: i['grams'], default=None)
    return D.food(best['foodId'])['category'] if best else None


def build_story(D):
    S = []
    clean = {r['id'] for r in clean_recipes(D)}
    for _, a, b in WEEK:
        assert a in clean and b in clean, (a, b)

    S += cover(KEY)
    S += intro_page(None, [
        'Il piano della settimana è fatto di <b>ricette reali</b> del sito: puoi aprirle, scalarle e sostituirle.',
        'Non è una dieta: è un <b>esempio di come si organizza</b>. Usa le tue ricette e i tuoi gusti.',
        'La <b>scheda del capitolo 7</b> è un planner da stampare.',
    ])

    # ------------------------------------------------------------ 01
    S += ch('01', 'Perché pianificare')
    S += [
        P('Pianificare non significa mangiare per forza le stesse cose. Significa togliere la decisione dell\'ultimo minuto: '
          'quella che, alle otto di sera e stanchi, porta più spesso a scelte poco pensate.', 'lead'),
        Callout('quick', [P('<b>Quattro mosse:</b> 1) guarda la settimana e segna gli impegni; 2) scegli i pasti “ancora” '
                            '(quelli che non si spostano); 3) cucina in blocchi, non un piatto alla volta; 4) fai la lista '
                            'della spesa <b>dalle ricette</b>, non dalla dispensa.', 'callout')]),
        P('Cosa cambia, in pratica', 'h2'),
    ]
    S += bullets([
        '<b>Meno spreco.</b> Compri quello che userai davvero.',
        '<b>Meno stress.</b> Sai già cosa c\'è per cena, anche nei giorni pieni.',
        '<b>Più varietà.</b> Quando scrivi la settimana vedi cosa manca: più legumi, più pesce, più verdure.',
        '<b>Più flessibilità.</b> Un piano non è un obbligo: se cambia qualcosa, sposti un pasto, non lo salti.',
    ])

    # ------------------------------------------------------------ 02
    rows, day_items = [], []
    tot = {'kcal': 0, 'protein': 0.0, 'fiber': 0.0}
    counts = OrderedDict()
    for day, a, b in WEEK:
        ra, rb = D.recipe(a), D.recipe(b)
        kc = ra['totals']['kcal'] + rb['totals']['kcal']
        pr = ra['totals']['protein'] + rb['totals']['protein']
        fb = ra['totals']['fiber'] + rb['totals']['fiber']
        tot['kcal'] += kc
        tot['protein'] += pr
        tot['fiber'] += fb
        rows.append([day, esc(ra['name']), esc(rb['name']), str(kc), fmt(pr), fmt(fb)])
        day_items.append((day, kc, BLUE, f'{kc} kcal'))
        for rr in (ra, rb):
            c = main_protein_cat(D, rr)
            counts[c] = counts.get(c, 0) + 1
    print(f"  [settimana] pranzo+cena medi: {tot['kcal'] / 7:.0f} kcal · {tot['protein'] / 7:.1f} g proteine · {tot['fiber'] / 7:.1f} g fibre")
    S += ch('02', 'Una settimana di pranzi e cene')
    S += [
        P('Quattordici pasti, tutti dal database di Gustoscopio. Colazione e spuntini sono esclusi: li trovi nelle rispettive guide.', 'lead'),
        data_table(['Giorno', 'Pranzo', 'Cena', 'kcal', 'Prot. (g)', 'Fibre (g)'], rows,
                   [20 * mm, 46 * mm, 50 * mm, 14 * mm, 20 * mm, 20 * mm], num_cols=(3, 4, 5), font_scale=0.92),
        Spacer(1, 3 * mm),
        P('Come si distribuisce la proteina principale', 'h2'),
        data_table(['Fonte principale', 'Volte a settimana'],
                   [[k, str(v)] for k, v in sorted(counts.items(), key=lambda x: -x[1])],
                   [80 * mm, 40 * mm], num_cols=(1,)),
        Spacer(1, 2 * mm),
        P('“Legumi” comprende anche la soia (edamame). La variazione dipende dai tuoi gusti: qui è solo un esempio di varietà.', 'small'),
        Callout('note', [P(f"<b>Un esempio, non una prescrizione.</b> In media, pranzo e cena di questa settimana apportano circa "
                           f"{tot['kcal'] // 7} kcal e {tot['protein'] / 7:.0f} g di proteine al giorno: il resto della giornata "
                           f"(colazione, spuntini) si aggiunge. Per sapere quanta energia serve a te usa lo strumento "
                           f"Fabbisogno e scala le porzioni.", 'callout')]),
    ]

    # ------------------------------------------------------------ 03
    agg = {}
    for _, a, b in WEEK:
        for rid in (a, b):
            for i in D.recipe(rid)['ingredients']:
                agg[i['foodId']] = agg.get(i['foodId'], 0) + i['grams']
    bycat = OrderedDict((c, []) for c in CAT_ORDER)
    for fid, g in agg.items():
        c = D.food(fid)['category']
        bycat.setdefault(c, []).append((D.food(fid)['name'], g))
    rows = []
    for c, lst in bycat.items():
        if not lst:
            continue
        lst.sort(key=lambda x: -x[1])
        tot_g = sum(g for _, g in lst)
        rows.append([c, esc(', '.join(f'{n.lower()} {g} g' for n, g in lst)), f'{tot_g:,}'.replace(',', '.') + ' g'])
    S += ch('03', 'La lista della spesa, dalle ricette')
    S += [
        P('Sommando gli ingredienti dei quattordici pasti (una porzione ciascuno) esce una lista precisa, senza acquisti a caso.', 'lead'),
        data_table(['Categoria', 'Cosa serve', 'Totale'], rows, [30 * mm, 118 * mm, 22 * mm], num_cols=(2,), font_scale=0.9),
        Spacer(1, 3 * mm),
        Callout('tip', [P('<b>Controlla crudo e cotto.</b> Pasta, riso e cereali sono conteggiati come nella ricetta: alcuni a crudo, altri già '
                          'cotti (farro, quinoa, legumi). Se compri legumi secchi, ne serve molto meno peso. '
                          '<b>Poi moltiplica per il numero di persone</b> e togli ciò che hai già in casa.', 'callout')]),
        P('Prima di uscire', 'h2'),
    ]
    S += bullets([
        'Guarda cosa hai già: frigo, freezer, dispensa. La lista si fa sottraendo.',
        'Raggruppa per reparto (verdura, banco, scaffali): fai meno giri.',
        'Lascia uno spazio per un imprevisto, non per il carrello dell\'impulso.',
    ])

    # ------------------------------------------------------------ 04
    S += ch('04', 'Cucinare in anticipo')
    S += [
        P('La chiave non è cucinare tutto la domenica: è cucinare <b>componenti</b>, da assemblare durante la settimana. '
          'È lo stesso schema del piatto bilanciato.', 'lead'),
        data_table(['Componente', 'Cosa preparare', 'Come conservarlo'], [
            ['Cereale', 'Riso, farro, orzo, pasta cotti per 3-4 pasti.', 'In contenitori chiusi, in frigorifero.'],
            ['Legumi', 'Una pentola di lenticchie, ceci o fagioli.', 'In frigorifero per pochi giorni, o in porzioni nel freezer.'],
            ['Verdure', 'Lavate e tagliate; una teglia di verdure al forno.', 'Crude e asciutte, o cotte in frigorifero.'],
            ['Proteina', 'Pollo o tacchino cotti; uova sode; tofu.', 'In frigorifero, ben chiusi.'],
            ['Condimenti', 'Olio, limone, erbe, salse semplici.', 'Sempre a portata di mano.'],
        ], [28 * mm, 72 * mm, 70 * mm], font_scale=0.94),
        Spacer(1, 3 * mm),
        Callout('note', [P('<b>Sicurezza.</b> Raffredda in fretta i cibi cotti e mettili in frigorifero senza lasciarli a temperatura ambiente per ore. '
                           'In genere gli avanzi cotti si consumano entro tre o quattro giorni; per tempi più lunghi, congela. '
                           'Scalda bene prima di mangiare. Se un cibo ha un odore o un aspetto strano, non mangiarlo.', 'callout')]),
        P('Come si assembla in cinque minuti', 'h2'),
    ]
    S += bullets([
        '<b>Bowl:</b> cereale + legumi + verdura + condimento.',
        '<b>Insalata di cereali:</b> cereale + proteina + verdure crude + olio e limone.',
        '<b>Zuppa:</b> legumi + verdure + un cereale in fondo.',
    ])

    # ------------------------------------------------------------ 05
    quick = sorted([r for r in clean_recipes(D) if r['category'] in ('Pranzo', 'Cena', 'Pranzo/Cena') and r['time'] <= 15],
                   key=lambda r: r['time'])
    rows = [[esc(r['name']), f"{r['time']} min", str(r['totals']['kcal']), fmt(r['totals']['protein'])] for r in quick]
    S += ch('05', 'Quando salta tutto')
    S += [
        P('Il piano funziona quando regge agli imprevisti. Ecco il piano B: piatti pronti in un quarto d\'ora, dal database.', 'lead'),
        data_table(['Ricetta', 'Tempo', 'kcal', 'Proteine (g)'], rows, [92 * mm, 24 * mm, 22 * mm, 32 * mm], num_cols=(1, 2, 3)),
        Spacer(1, 3 * mm),
        P('La scorta che ti salva', 'h2'),
    ]
    S += bullets([
        '<b>Dispensa:</b> pasta e riso, legumi in scatola, tonno al naturale, passata di pomodoro.',
        '<b>Freezer:</b> verdure surgelate, pesce, pane a fette, porzioni di legumi cotti.',
        '<b>Frigorifero:</b> uova, yogurt, verdure a lunga conservazione, frutta.',
    ])
    S += [Callout('tip', [P('<b>Sposta, non saltare.</b> Se il pasto previsto per oggi non si può fare, mangia quello di domani e '
                            'rinvia il resto: il piano è una guida, non un compito.', 'callout')])]

    # ------------------------------------------------------------ 06
    S += ch('06', 'Sei domande frequenti')
    S += [
        qa('DIPENDE', 'Devo passare tutta la domenica in cucina?',
           'No. Bastano un\'ora o due per preparare due o tre componenti (un cereale, dei legumi, una teglia di verdure). '
           'Il resto si assembla durante la settimana.'),
        qa('DIPENDE', 'E se mangio fuori?',
           'Segna quei pasti nel planner e togli il piatto corrispondente: il piano si adatta alla vita, non il contrario. '
           'Fuori casa, il metodo del piatto funziona anche senza bilancia.'),
        qa('MITO', 'Pianificare significa mangiare sempre le stesse cose.',
           'Solo se scegli di farlo. Un planner è più utile per la varietà: vedi in un colpo d\'occhio cosa ripeti troppo.'),
        qa('DIPENDE', 'Come faccio se cucino per una sola persona?',
           'Cucina in più porzioni e congela il resto: due o tre piatti diversi in freezer ti danno una settimana varia con meno lavoro.'),
        qa('DIPENDE', 'Quanti pasti diversi servono?',
           'Anche cinque o sei ricette che ruotano vanno bene. La varietà si sposta sugli ingredienti (verdure di stagione, legumi diversi).'),
        qa('VERITÀ', 'La lista della spesa fa davvero risparmiare?',
           'In genere sì: compri ciò che userai e riduci gli sprechi. Non è una garanzia, ma è uno dei cambi più semplici che si possano fare.'),
    ]

    # ------------------------------------------------------------ 07
    S += ch('07', 'Il tuo planner', dark=False)
    S += [P('Da stampare: compila i pasti della settimana e, sotto, la lista della spesa.', 'lead')]
    days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
    t = Table([[Paragraph(esc(h).upper(), STYLES['th']) for h in ['', 'Pranzo', 'Cena', 'Spuntino']]] +
              [[Paragraph(d, STYLES['cellb']), '', '', ''] for d in days],
              colWidths=[20 * mm, 58 * mm, 58 * mm, 34 * mm], rowHeights=[7.5 * mm] + [10.5 * mm] * 7)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NIGHT), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                           ('LINEBELOW', (0, 1), (-1, -1), 0.5, MUTED), ('LEFTPADDING', (0, 0), (-1, -1), 5)]))
    S += [t, Spacer(1, 4 * mm), P('La mia lista', 'h2'),
          FillLine('Verdure e frutta:', .95), FillLine('Cereali e legumi:', .95), FillLine('Proteine (carne, pesce, uova, latticini):', .95),
          FillLine('Condimenti e dispensa:', .95), Spacer(1, 2 * mm)]
    S += [
        CheckItem('Ho guardato cosa ho già in casa.'),
        CheckItem('Ho segnato i pasti fuori casa.'),
        CheckItem('Ho previsto un piano B da 15 minuti.'),
    ]

    S += closing(KEY, [
        ('Scegli i tuoi pasti ancora', 'Apri <b>Ricette</b>, filtra per Pranzo o Cena e scegli quelli che ripeteresti volentieri.'),
        ('Fai la lista dalle ricette', 'Ogni ricetta ha gli ingredienti in grammi e le porzioni scalabili: sommali e sottrai ciò che hai già.'),
        ('Usa il frigo come punto di partenza', 'In <b>Apri il frigo</b> seleziona ciò che hai e guarda quali ricette puoi fare.'),
    ])
    return S
