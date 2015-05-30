import mechanize
from BeautifulSoup import BeautifulSoup
import json
import time

pages = ['definition', 'symptoms', 'causes', 'treatment']
terms = {}

mech = mechanize.Browser()

filo = open('./dump_links.txt')
val = 0
urls = []
for line in filo:
    #time.sleep(2)
    if('http' in line):
        try:
            lead = line.split('definition')[0]
            tail = line.split('definition')[1]

        except:
            continue

        for i in xrange(len(pages)):
            if(not (lead+pages[i] + tail) in urls):
                urls.append(lead+pages[i]+tail)
filo.close()

#print urls
for url in urls:
    term = ''
    doc_type = ''
    f = []

    try:
        term = url.split('diseases-conditions/')[1].split('/')[0]
        f = url.split('/')
        doc_type = f[len(f)-2]
        print term, doc_type
    except:
        print 'bad'
        continue

    resp = mech.open(url)
    html = resp.read()
    soup = BeautifulSoup(html)
    contents = []

    if(not terms.has_key(term)):
        new_arr = [[] for i in xrange(len(pages))]
        terms[term] = ['', new_arr]

    t = soup.find(id = 'main-content')
    idx = pages.index(doc_type)
    if(doc_type == 'definition'):
        for l in  t.findAll('p'):
            str_val = str(l).split('<p>')[1].split('</p>')[0]
            if(not 'Mayo Clinic' in str_val and not 'e-newsletter' in str_val):
                contents.append(str_val)
        out_str = '  '.join(contents)
        terms[term][pages.index('definition')] = out_str
        terms[term][1][3] = url;
    elif(doc_type == 'symptoms'):
        j = t.findAll('ul')
        for k in j:
            for l in k.findAll('li'):
                if(not 'href' in str(l) and not 'class="prev"' in str(l)):
                    try:
                        str_val = str(l).split('<li>')[1].split('</li>')[0]
                    except:
                        str_val = str(l)
                    contents.append(str_val)
                else:
                    contents = []
                    break
            if(contents != []):
                terms[term][1][pages.index(doc_type)-1] = contents
                break
    elif(doc_type == 'causes'):
        j = t.findAll('ul')
        for k in j:
            #print k
            for l in k.findAll('li'):
                #print l
                #continue
                if(not 'href' in str(l) and not 'class="prev"' in str(l)):
                    try:
                        str_val = str(l).split('<li>')[1].split('</li>')[0]
                        if('<strong>' in str_val):
                            str_val = str_val.split('<strong>')[1].split('</strong')[0]
                    except:
                        str_val = str(l)
                    contents.append(str_val)
                else:
                    contents = []
                    break
            if(contents != []):
                terms[term][1][pages.index(doc_type)-1] = contents
                break
    else:
        j = t.findAll('ul')
        for k in j:
            for l in k.findAll('li'):
                if(not 'href' in str(l) and not 'class="prev"' in str(l)):
                    try:
                        str_val = str(l).split('<li>')[1].split('</li>')[0]
                        if('<strong>' in str_val):
                            str_val = str_val.split('<strong>')[1].split('</strong')[0]
                    except:
                        str_val = str(l)
                    contents.append(str_val)
                else:
                    contents = []
                    break
            if(contents != []):
                terms[term][1][pages.index(doc_type)-1] = contents
                break
    '''
    splitter = t.prettify()
    out_str = splitter.split('</div>')[3].split('<div')[0]
    if(not terms.has_key(term)):
        terms[term] = ['' for i in xrange(len(pages))]
    print doc_type, pages.index(doc_type)
    terms[term][pages.index(doc_type)] = out_str
    '''
    val += 1
    if(val > 10):
        val = 0
        time.sleep(3)
    #    break

'''
for k, v in terms.items():
    print len(v)
    print v
'''
out = open('./dump_json.txt', 'w')
out.write(json.dumps([{ 'name': k, 'description': v[0], 'symptoms': v[1][0], 'causes': v[1][1], 'treatment': v[1][2], 'source': v[1][3]} for k, v in terms.items()], indent=4))
out.close()
