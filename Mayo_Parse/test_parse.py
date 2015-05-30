from Naked.toolshed.shell import muterun
import os
from BeautifulSoup import BeautifulSoup

max_range = 12
increm = 2

terms = {}
file_arr = []
pages = ['definition', 'symptoms', 'causes', 'treatment']

count = 0
filo = open('dump_links.txt')
for line in filo:
    count += 1
    term = line.split('\n')[0].split('diseases-conditions/')[1].split('/')[0]
    file_arr.append(term)
    terms[term] = ['', [[] for i in xrange(len(pages))]]

    if(count > max_range):
        break
filo.close()

curr_dir = os.path.dirname(os.path.realpath(__file__))
cmd = 'node ' + curr_dir + '/test_parse.js '
for i in range(0, max_range, increm):
    cmd_tmp = cmd + str(i)
    result1 = muterun(cmd_tmp)

    splices = result1.stdout.split('##################################################################\n')[1:]
    for pices in xrange(len(splices)):
        contents = []
        piece = splices[pices]
        url = piece.split('\n')[0]
        print url

        term = url.split('diseases-conditions/')[1].split('/')[0]
        f = url.split('/')
        doc_type = f[len(f)-2]

        print term, doc_type

        soup = BeautifulSoup(piece)
        t = soup.find(id = 'main-content')

        idx = pages.index(doc_type)
        if(doc_type == 'definition'):
            try:
                for l in  t.findAll('p'):
                    str_val = str(l).split('<p>')[1].split('</p>')[0]
                    if(not 'Mayo Clinic' in str_val and not 'e-newsletter' in str_val):
                        contents.append(str_val)
            except:
                print t
                print 'failure'
            out_str = '  '.join(contents)
            print out_str
            terms[term][pages.index('definition')] = out_str
            terms[term][1][3] = url;

print terms
'''
terms = {}
parts = ['definition', 'symptoms', 'causes', 'treatment']

splices = result1.stdout.split('##################################################################\n')
for piece in splices:
    url = piece.split('\n')[0]
    print url
    term = ''
    f = []
    doc_type = ''
    try:
        term = url.split('diseases-conditions/')[1].split('/')[0]
        f = url.split('/')
        doc_type = f[len(f)-2]
        print term, doc_type
    except:
        print 'bad'
        continue

    idx = parts.index(doc_type)

    soup = BeautifulSoup(piece)
    contents = []
    for l in soup.findAll('p'):
        str_val = str(l).split('<p>')[1].split('</p>')[0]
        if(not 'Mayo Clinic' in str_val and not 'e-newsletter' in str_val):
            contents.append(str_val)
    out_str = '  '.join(contents)

    if(term not in terms):
        new_arr = ['' for i in xrange(len(parts))]
        terms[term] = new_arr
    terms[term][idx] = out_str
print terms['personality-disorders']
'''

#print result1.stdout;
#outFile = open('dumpFile.txt', 'w')
#outFile.write(result1.stdout)
#outFile.close()
