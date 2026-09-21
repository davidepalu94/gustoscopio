# -*- coding: utf-8 -*-
"""Guida 4 — Il tuo fabbisogno (energia: metabolismo basale, attività, uso del numero)."""
from design import *
from common import *
from guide_proteine import ch, qa

KEY = 'guida-fabbisogno'

LEVEL_SHORT = {'sedentario': 'Sedentario', 'leggero': 'Leggero', 'moderato': 'Moderato',
               'intenso': 'Intenso', 'atleta': 'Atleta'}
PROFILE_LABEL = {'F60': 'Donna · 60 kg', 'F70': 'Donna · 70 kg', 'M75': 'Uomo · 75 kg', 'M85': 'Uomo · 85 kg'}


def mifflin(sex, age, weight, height):
    """Solo per mostrare i passaggi nell'esempio: il risultato è controllato contro la funzione REALE."""
    return 10 * weight + 6.25 * height - 5 * age + (5 if sex == 'M' else -161)


def build_story(D):
    S = []
    et = D.energy_table
    profiles = {p['id']: p for p in et['profiles']}
    E = et['byProfile']
    levels = [l['id'] for l in D.activity_levels]

    # controllo di coerenza: la formula mostrata = la funzione dello strumento
    for pid, pr in profiles.items():
        assert round(mifflin(pr['sex'], pr['age'], pr['weightKg'], pr['heightCm'])) == E[pid]['sedentario']['bmr'], pid
    mult = {lv: round(E['F60'][lv]['maintenance'] / E['F60'][lv]['bmr'], 3) for lv in levels}

    S += cover(KEY)
    S += intro_page(None, [
        'Leggila con lo strumento <b>Fabbisogno</b> di Gustoscopio aperto: i numeri delle tabelle sono calcolati con le stesse formule.',
        'Il fabbisogno è una <b>stima</b>. Il capitolo 5 spiega come capire, nel tempo, se per te è giusta.',
        'Se hai una condizione clinica, sei in gravidanza o allattamento, o hai avuto un disturbo alimentare, il numero giusto lo decide chi ti segue.',
    ])

    # ------------------------------------------------------------ 01
    p = profiles['F60']
    e = E['F60']['moderato']
    S += ch('01', 'Cos\'è il fabbisogno')
    S += [
        P('Il fabbisogno energetico è la quantità di energia che il corpo consuma in un giorno. Mangiare in linea con quel '
          'numero, in media, mantiene il peso stabile.', 'lead'),
        P('Di cosa è fatto', 'h2'),
    ]
    S += bullets([
        '<b>Metabolismo basale.</b> L\'energia che il corpo usa a riposo, per tenere in funzione organi, temperatura, respiro. '
        'È di solito la quota più grande della giornata.',
        '<b>Attività fisica.</b> Sia l\'allenamento sia il movimento quotidiano: camminare, salire le scale, stare in piedi al lavoro.',
        '<b>Digestione.</b> Digerire e assorbire il cibo costa energia: circa un decimo di ciò che mangi, con variazioni '
        'legate alla composizione del pasto.',
    ])
    S += [
        Spacer(1, 3 * mm),
        P('Un esempio', 'h3'),
        P(f"Una donna di {p['age']} anni, {p['heightCm']} cm, {p['weightKg']} kg, con attività moderata (3-5 giorni a settimana)."),
        StackedDay([('Metabolismo basale', e['bmr'], BLUE, f"{e['bmr']} kcal"),
                    ('Attività e digestione', e['maintenance'] - e['bmr'], BLUE_SOFT, f"{e['maintenance'] - e['bmr']} kcal")],
                   f"{e['maintenance']} kcal al giorno"),
        Callout('quick', [P('<b>È una stima, non una misura.</b> Due persone con lo stesso peso, la stessa altezza e la stessa '
                            'età possono consumare in modo diverso. Il numero è il punto di partenza; la conferma arriva '
                            'osservando cosa succede nel tempo.', 'callout')]),
    ]

    # ------------------------------------------------------------ 02
    S += ch('02', 'La formula, passo per passo')
    S += [
        P('Lo strumento Fabbisogno di Gustoscopio usa la formula di Mifflin-St Jeor: una delle più diffuse per stimare il '
          'metabolismo basale di un adulto. Poi lo moltiplica per un coefficiente che dipende dall\'attività.', 'lead'),
        data_table(['', 'Metabolismo basale (kcal)'], [
            ['Uomo', '10 × peso (kg) + 6,25 × altezza (cm) − 5 × età + 5'],
            ['Donna', '10 × peso (kg) + 6,25 × altezza (cm) − 5 × età − 161'],
        ], [28 * mm, CONTENT_W - 28 * mm]),
        Spacer(1, 3 * mm),
        P('Il calcolo, in chiaro', 'h2'),
        P(f"Donna, {p['age']} anni, {p['heightCm']} cm, {p['weightKg']} kg:"),
        P(f"10 × {p['weightKg']} + 6,25 × {p['heightCm']} − 5 × {p['age']} − 161 = <b>{e['bmr']} kcal</b> di metabolismo basale."),
        P('Poi si moltiplica per il coefficiente di attività:'),
    ]
    S.append(data_table(['Livello di attività', 'Coefficiente'], [
        [esc(l['label']), fmt(mult[l['id']], 3)] for l in D.activity_levels
    ], [110 * mm, 40 * mm], num_cols=(1,)))
    S += [
        Spacer(1, 3 * mm),
        P(f"Con attività moderata: {e['bmr']} × {fmt(mult['moderato'], 2)} = <b>{e['maintenance']} kcal</b> al giorno. "
          f"È il fabbisogno di <b>mantenimento</b>."),
        Callout('note', [P('<b>Quanto è precisa?</b> Per molte persone si avvicina al valore reale, ma l\'errore individuale '
                           'può essere importante: massa muscolare, genetica, ormoni, sonno e stress non entrano nella formula. '
                           'Ecco perché il risultato si verifica nel tempo (capitolo 5).', 'callout')]),
    ]

    # ------------------------------------------------------------ 03
    S += ch('03', 'Quattro profili, cinque livelli')
    hdr = ['Livello'] + [PROFILE_LABEL[p_['id']] for p_ in et['profiles']]
    rows = [[LEVEL_SHORT[lv]] + [f"{E[p_['id']][lv]['maintenance']:,}".replace(',', '.') for p_ in et['profiles']] for lv in levels]
    S += [
        P('Fabbisogno di mantenimento (kcal al giorno) calcolato con la funzione reale dello strumento. Donna: 35 anni, '
          '165 cm. Uomo: 40 anni, 178 cm.', 'lead'),
        data_table(hdr, rows, [40 * mm] + [32.5 * mm] * 4, num_cols=(1, 2, 3, 4)),
        Spacer(1, 3 * mm),
        data_table(['Metabolismo basale (kcal)'] + [PROFILE_LABEL[p_['id']] for p_ in et['profiles']],
                   [['A riposo'] + [f"{E[p_['id']]['sedentario']['bmr']:,}".replace(',', '.') for p_ in et['profiles']]],
                   [40 * mm] + [32.5 * mm] * 4, num_cols=(1, 2, 3, 4)),
        Spacer(1, 4 * mm),
    ]
    lo, hi = E['F60']['moderato']['maintenance'], E['M85']['moderato']['maintenance']
    S += [
        NumberRow([(f'{lo:,}'.replace(',', '.'), 'kcal: donna, 60 kg, attività moderata'),
                   (f'{hi:,}'.replace(',', '.'), 'kcal: uomo, 85 kg, attività moderata'),
                   (f'{hi - lo:,}'.replace(',', '.'), 'kcal di differenza, con la stessa attività')]),
        Spacer(1, 2 * mm),
        P('Il fabbisogno cambia molto da persona a persona: copiare i numeri di un\'altra persona non ha senso.'),
        P('Come scegliere il livello di attività', 'h2'),
    ]
    S += bullets([
        '<b>Conta la settimana intera, non il giorno migliore.</b> Se ti alleni tre volte ma il resto del tempo sei seduto, '
        'il livello è più basso di quello che sembra.',
        '<b>Si tende a sovrastimare.</b> Nel dubbio, scegli il livello inferiore e osserva (capitolo 5): è più facile correggere '
        'verso l\'alto che accorgersi di aver mangiato di più per settimane.',
        '<b>Il lavoro conta.</b> Passare la giornata in piedi o a camminare pesa più di un\'ora di palestra.',
    ])

    # ------------------------------------------------------------ 04
    S += ch('04', 'Dai numeri ai pasti')
    maint = E['F60']['moderato']['maintenance']
    split = [('Colazione', 0.20), ('Pranzo', 0.35), ('Spuntino', 0.10), ('Cena', 0.35)]
    segs, rows = [], []
    for i, (nm, sh) in enumerate(split):
        kc = round(maint * sh)
        segs.append((nm, kc, [BLUE, BLUE_SOFT, NIGHT, BLUE][i], f'{kc}'))
        rows.append([nm, f'{int(sh * 100)}%', str(kc)])
    S += [
        P('Un numero al giorno non si mangia: si mangia in pasti. Ecco un esempio di ripartizione, con lo stesso profilo '
          'del capitolo 1.', 'lead'),
        StackedDay(segs, f'{maint} kcal al giorno'),
        data_table(['Pasto', 'Quota', 'kcal'], rows, [60 * mm, 40 * mm, 40 * mm], num_cols=(1, 2)),
        Spacer(1, 3 * mm),
        Callout('note', [P('<b>La ripartizione è indicativa.</b> Non esiste una divisione “giusta” valida per tutti: cambia con gli '
                           'orari, la fame, il lavoro, l\'allenamento. Una colazione più leggera o una cena più ricca sono '
                           'scelte legittime se l\'insieme della giornata torna.', 'callout')]),
        P('Per passare dai kcal al piatto', 'h2'),
        P('Usa le porzioni di riferimento e il metodo del piatto: metà verdure, un quarto di cereali, un quarto di proteine, '
          'più un condimento misurato. Le ricette di Gustoscopio riportano già le kcal di ogni porzione e si possono scalare. '
          'Per le proteine, lo strumento dedicato ti dà un intervallo in grammi per il tuo peso.'),
    ]

    # ------------------------------------------------------------ 05
    d_ = E['F60']['moderato']
    S += ch('05', 'Come capire se il numero funziona')
    S += [
        P('La formula ti dà un punto di partenza. La risposta vera la dà il tuo corpo, ma va letta con calma.', 'lead'),
        P('Cosa osservare, per due o tre settimane', 'h2'),
        data_table(['Segnale', 'Come leggerlo'], [
            ['Peso, una media settimanale', 'Il peso di un singolo giorno oscilla anche di un chilo o più per acqua e contenuto '
                                            'intestinale. Conta la tendenza su settimane, non il numero di stamattina.'],
            ['Energia durante il giorno', 'Stanchezza costante o cali forti possono indicare che mangi meno di quanto ti serve.'],
            ['Fame e sazietà', 'Una fame ingestibile a fine giornata è un segnale da considerare, non da ignorare.'],
            ['Sonno e recupero', 'Dormire male e recuperare a fatica dopo l\'allenamento sono spie di poca energia disponibile.'],
            ['Prestazione', 'Se ti alleni, cali di forza o resistenza senza altre spiegazioni contano.'],
        ], [55 * mm, CONTENT_W - 55 * mm]),
        Spacer(1, 3 * mm),
        Callout('quick', [P('<b>Se il peso resta stabile</b> per due o tre settimane mangiando circa il numero calcolato, il '
                            'mantenimento è una buona stima. Se sale o scende, la stima va corretta: di poco, non di colpo.',
                            'callout')]),
        P('E se il tuo obiettivo è cambiare peso?', 'h2'),
        P(f"Lo strumento del sito mostra anche due riferimenti, a 500 kcal sotto e sopra il mantenimento: per il profilo "
          f"di questa guida sarebbero {d_['deficit']:,} e {d_['surplus']:,} kcal.".replace(',', '.') +
          ' Sono ordini di grandezza per ragionare, non prescrizioni: la velocità giusta, la durata e la composizione '
          'dipendono da te.'),
        Callout('note', [P('<b>Quando serve un professionista.</b> Se vuoi perdere o aumentare peso in modo significativo, se ti '
                           'alleni molto, se hai una condizione clinica o se ti accorgi di essere ossessionato dai numeri: fai '
                           'definire il tuo obiettivo con chi può valutarti di persona.', 'callout')]),
    ]

    # ------------------------------------------------------------ 06
    S += ch('06', 'Sei domande frequenti')
    S += [
        qa('DIPENDE', 'Devo mangiare esattamente il mio fabbisogno?',
           'No. Il fabbisogno è una media: alcuni giorni mangerai di più, altri di meno. Conta l\'andamento su settimane, '
           'non la precisione al chilocalorie.'),
        qa('DIPENDE', 'Le kcal “bruciate” dallo smartwatch sono affidabili?',
           'Sono stime, spesso meno precise di quanto sembri. Puoi usarle come indicazione di tendenza (più o meno attivo di '
           'ieri), non come conto esatto da “recuperare” a tavola.'),
        qa('MITO', 'Dopo una dieta il metabolismo è “rotto” per sempre?',
           'Il corpo si adatta a una restrizione prolungata consumando un po\' meno, ma non si “rompe”. È un motivo in più per '
           'evitare diete drastiche e cambiamenti bruschi, non per rinunciare a cambiare.'),
        qa('VERITÀ', 'Perché uomini e donne hanno formule diverse?',
           'Perché, in media, cambiano massa muscolare e composizione corporea: la formula riflette una differenza media, non '
           'una regola per ogni singola persona.'),
        qa('DIPENDE', 'Serve contare le calorie?',
           'Non per forza. Molte persone stanno bene con piatto e porzioni. Contare può servire per un periodo, per capire '
           'come mangi, ma non dovrebbe diventare un obbligo né una fonte di ansia.'),
        qa('DIPENDE', 'Il fabbisogno cambia nel tempo?',
           'Sì: con il peso, l\'età, l\'attività, i periodi di vita. Conviene ricalcolarlo quando qualcosa cambia in modo '
           'evidente, non ogni settimana.'),
    ]

    # ------------------------------------------------------------ 07
    S += ch('07', 'La tua scheda', dark=False)
    S += [
        P('Da stampare o da compilare a schermo. Ti serve per fissare il punto di partenza e tenere traccia di due settimane.', 'lead'),
        P('I miei dati', 'h2'),
        FillLine('Età', .4), FillLine('Peso (kg) e altezza (cm)', .6), FillLine('Livello di attività, scelto con onestà', .9),
        FillLine('Metabolismo basale calcolato (kcal)', .7), FillLine('Fabbisogno di mantenimento (kcal)', .7),
        Spacer(1, 3 * mm),
        P('Le mie due settimane', 'h2'),
    ]
    t = Table([[Paragraph(esc(h).upper(), STYLES['th']) for h in ['Settimana', 'Peso medio (kg)', 'Energia (1-5)', 'Fame (1-5)', 'Sonno (1-5)']]] +
              [[Paragraph(x, STYLES['cellb']), '', '', '', ''] for x in ['Settimana 1', 'Settimana 2', 'Settimana 3']],
              colWidths=[34 * mm, 34 * mm, 34 * mm, 34 * mm, 34 * mm], rowHeights=[7.5 * mm] + [11 * mm] * 3)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NIGHT), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                           ('LINEBELOW', (0, 1), (-1, -1), 0.5, MUTED), ('LEFTPADDING', (0, 0), (-1, -1), 5)]))
    S += [t, Spacer(1, 4 * mm), P('Prima di cambiare il numero', 'h2')]
    S += [
        CheckItem('Sono passate almeno due settimane, mangiando in modo abbastanza regolare.'),
        CheckItem('Ho guardato la media settimanale del peso, non un singolo giorno.'),
        CheckItem('Ho considerato energia, fame e sonno, non solo la bilancia.'),
        CheckItem('Se voglio cambiare, cambio di poco (non di colpo) e riosservo.'),
    ]

    S += closing(KEY, [
        ('Calcola con lo strumento', 'Apri <b>Fabbisogno</b> in Strumenti e inserisci i tuoi dati: confronta il risultato con le tabelle di questa guida.'),
        ('Osserva per due settimane', 'Compila la scheda del capitolo 7: peso medio, energia, fame e sonno. Solo dopo, se serve, correggi.'),
        ('Trasforma il numero in piatti', 'In <b>Ricette</b> ogni piatto ha già le kcal per porzione: scegline tre e ripetili, poi costruisci il resto con il <b>Plate Builder</b>.'),
    ])
    return S
