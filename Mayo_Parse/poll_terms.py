from Naked.toolshed.shell import muterun
import os

curr_dir = os.path.dirname(os.path.realpath(__file__))

print 'Starting zombies..'
cmd = 'node ' + curr_dir + '/poll_terms.js'
result1 = muterun(cmd)

dumps = result1.stdout.split(',')

print 'Starting filedump..'
filo = open(curr_dir + '/dump_links.txt', 'w')
for line in dumps:
    if(line != ''):
        filo.write(line + '\n')
filo.close()

print 'Cleaning up..'
